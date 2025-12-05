// CalendarModal.jsx
import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  Input,
  Label,
  Button
} from "./CalendarModal.styled";

const CalendarModal = ({ isOpen, onClose, onSubmit, onDelete, event, isEdit }) => {
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: ""
  });

  useEffect(() => {
    if (isEdit && event) {
      setForm({
        title: event.title,
        start: event.start,
        end: event.end
      });
    } else {
      setForm({
        title: "",
        start: "",
        end: ""
      });
    }
  }, [isEdit, event]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalHeader>
            <h3>{isEdit ? "일정 수정" : "일정 등록"}</h3>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>

          <ModalBody>
            <Label>제목</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
            />

            <Label>시작일</Label>
            <Input
              type="date"
              name="start"
              value={form.start}
              onChange={handleChange}
            />

            <Label>종료일</Label>
            <Input
              type="date"
              name="end"
              value={form.end}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            {isEdit && (
              <Button $cancel onClick={onDelete}>
                삭제
              </Button>
            )}

            <Button onClick={handleSubmit}>
              {isEdit ? "수정 완료" : "등록"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default CalendarModal;
