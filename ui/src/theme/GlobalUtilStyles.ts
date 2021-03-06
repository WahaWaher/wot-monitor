import { createGlobalStyle, css } from 'styled-components';

const GlobalUtilStyles = createGlobalStyle`
  /**
   * Display
   */
  .d-inline {
    display: inline !important;
  }

  .d-inline-block {
    display: inline-block !important;
  }

  .d-block {
    display: block !important;
  }
  
  .d-flex {
    display: flex !important;
  }

  .d-inline-flex {
    display: inline-flex !important;
  }

  .d-none {
    display: none !important;
  }

  /**
   * Position
   */
  /* .position-static {
    position: static !important;
  }

  .position-relative {
    position: relative !important;
  }

  .position-absolute {
    position: absolute !important;
  }

  .position-fixed {
    position: fixed !important;
  } */

  /**
   * Flex
   */
  .flex-flow-wrap {
    flex-flow: wrap !important;
  }

  .flex-fill {
    flex: 1 1 auto !important;
  }

  .flex-row {
    flex-direction: row !important;
  }

  .flex-column {
    flex-direction: column !important;
  }

  .flex-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-column-reverse {
    flex-direction: column-reverse !important;
  }

  .flex-grow-0 {
    flex-grow: 0 !important;
  }

  .flex-grow-1 {
    flex-grow: 1 !important;
  }

  .flex-shrink-0 {
    flex-shrink: 0 !important;
  }

  .flex-shrink-1 {
    flex-shrink: 1 !important;
  }

  .flex-wrap {
    flex-wrap: wrap !important;
  }

  .flex-nowrap {
    flex-wrap: nowrap !important;
  }

  .flex-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }

  .justify-content-start {
    justify-content: flex-start !important;
  }

  .justify-content-end {
    justify-content: flex-end !important;
  }

  .justify-content-center {
    justify-content: center !important;
  }

  .justify-content-between {
    justify-content: space-between !important;
  }

  .justify-content-around {
    justify-content: space-around !important;
  }

  .justify-content-evenly {
    justify-content: space-evenly !important;
  }

  .align-items-start {
    align-items: flex-start !important;
  }

  .align-items-end {
    align-items: flex-end !important;
  }

  .align-items-center {
    align-items: center !important;
  }

  .align-items-baseline {
    align-items: baseline !important;
  }

  .align-items-stretch {
    align-items: stretch !important;
  }

  .align-content-start {
    align-content: flex-start !important;
  }

  .align-content-end {
    align-content: flex-end !important;
  }

  .align-content-center {
    align-content: center !important;
  }

  .align-content-between {
    align-content: space-between !important;
  }

  .align-content-around {
    align-content: space-around !important;
  }

  .align-content-stretch {
    align-content: stretch !important;
  }

  .align-self-auto {
    align-self: auto !important;
  }

  .align-self-start {
    align-self: flex-start !important;
  }

  .align-self-end {
    align-self: flex-end !important;
  }

  .align-self-center {
    align-self: center !important;
  }

  .align-self-baseline {
    align-self: baseline !important;
  }

  .align-self-stretch {
    align-self: stretch !important;
  }

  .order-first {
    order: -1 !important;
  }

  .order-0 {
    order: 0 !important;
  }

  .order-1 {
    order: 1 !important;
  }

  .order-2 {
    order: 2 !important;
  }

  .order-3 {
    order: 3 !important;
  }

  .order-4 {
    order: 4 !important;
  }

  .order-5 {
    order: 5 !important;
  }

  .order-last {
    order: 6 !important;
  }

  /**
   * Margins
   */
  ${({ theme: { spacers } }) =>
    Object.keys(spacers).map((key) => {
      let k: number = parseInt(key);

      return css`
        .m-${key} {
          margin: ${spacers[k]} !important;
        }
        .mx-${key} {
          margin-left: ${spacers[k]} !important;
          margin-right: ${spacers[k]} !important;
        }
        .my-${key} {
          margin-top: ${spacers[k]} !important;
          margin-bottom: ${spacers[k]} !important;
        }
        .mt-${key} {
          margin-top: ${spacers[k]} !important;
        }
        .mb-${key} {
          margin-bottom: ${spacers[k]} !important;
        }
        .ml-${key} {
          margin-left: ${spacers[k]} !important;
        }
        .mr-${key} {
          margin-right: ${spacers[k]} !important;
        }
      `;
    })}

  .m-auto {
    margin: auto !important;
  }

  .mx-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .my-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }

  .mt-auto {
    margin-top: auto !important;
  }

  .mb-auto {
    margin-bottom: auto !important;
  }

  /**
   * Paddings
   */
   ${({ theme: { spacers } }) =>
     Object.keys(spacers).map((key) => {
      let k: number = parseInt(key);

       return css`
         .p-${key} {
           padding: ${spacers[k]} !important;
         }
         .px-${key} {
           padding-left: ${spacers[k]} !important;
           padding-right: ${spacers[k]} !important;
         }
         .py-${key} {
           padding-top: ${spacers[k]} !important;
           padding-bottom: ${spacers[k]} !important;
         }
         .pt-${key} {
           padding-top: ${spacers[k]} !important;
         }
         .pb-${key} {
           padding-bottom: ${spacers[k]} !important;
         }
         .pl-${key} {
           padding-left: ${spacers[k]} !important;
         }
         .pr-${key} {
           padding-right: ${spacers[k]} !important;
         }
       `;
     })}

  /**
   * Font weight / Font Style
   */
  .fst-italic {
    font-style: italic !important;
  }

  .fst-normal {
    font-style: normal !important;
  }

  .fw-light {
    font-weight: 300 !important;
  }

  .fw-lighter {
    font-weight: lighter !important;
  }

  .fw-normal {
    font-weight: 400 !important;
  }

  .fw-bold {
    font-weight: 700 !important;
  }

  .fw-bolder {
    font-weight: bolder !important;
  }

  /**
   * Text
   */
  .text-lowercase {
    text-transform: lowercase !important;
  }

  .text-uppercase {
    text-transform: uppercase !important;
  }

  .text-capitalize {
    text-transform: capitalize !important;
  }

  .text-left {
    text-align: left !important;
  }

  .text-right {
    text-align: right !important;
  }

  .text-center {
    text-align: center !important;
  }

  /**
   * Line Height
   */
  .lh-1 {
    line-height: 1 !important;
  }
  .lh-base {
    line-height: ${({ theme }) => theme.typography.lineHeight} !important;
  }

  /**
   * Width
   */
   .w-100p {
    width: 100% !important;
  }

  /**
   * Height
   */
  .h-100p {
    height: 100% !important;
  }
`;

export default GlobalUtilStyles;
