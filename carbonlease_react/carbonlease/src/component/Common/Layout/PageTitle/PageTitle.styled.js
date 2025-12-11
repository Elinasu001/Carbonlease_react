import styled from "styled-components";

export const PageTitleWrap = styled.div`
    /* Page Title */
    .page-title {
        position: relative;
        background-color: var(--background-color);
        margin-top:120px;
        padding-top: 45px;
        color: var(--default-color);
    }

    .page-title h1 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 0;
    }

    .page-title .breadcrumbs ol {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 15px;
    }

    .page-title .breadcrumbs ol li + li {
        padding-left: 10px;
    }

    .page-title .breadcrumbs ol li + li::before {
        content: "/";
        display: inline-block;
        padding-right: 10px;
        color: color-mix(in srgb, var(--default-color), transparent 70%);
    }

    @media (max-width: 1200px) {
        .page-title {
            margin-top:90px;
            padding-top: 30px;
        }
    }

    /* Tablet */
    @media (max-width: 992px) {
        
        .page-title {
            padding-top: 20px;
        }

        .page-title h1 {
            font-size: 28px;
        }

        .page-title .breadcrumbs ol {
            font-size: 14px;
        }
    }

    /* Mobile */
    @media (max-width: 768px) {

        .page-title h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .page-title .breadcrumbs ol {
            font-size: 13px;
        }
    }

    /* Small Mobile */
    @media (max-width: 576px) {
        .page-title h1 {
            font-size: 20px;
        }

        .page-title .breadcrumbs ol {
            font-size: 12px;
        }
    }
`;

export default PageTitleWrap;
