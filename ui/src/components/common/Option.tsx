import { FC } from 'react';
import styled, { css } from 'styled-components';

type CommonProps = {
  fullWidth?: boolean;
};

const defaulpCommonProps: CommonProps = {
  fullWidth: false,
};

type OptionsType = FC<CommonProps> & { Text: typeof OptionText } & {
  Value: typeof OptionValue;
};

const Option: OptionsType = (props) => <OptionRoot {...props} />;
const OptionText: FC<CommonProps> = (props) => <OptionTextRoot {...props} />;
const OptionValue: FC<CommonProps> = (props) => <OptionValueRoot {...props} />;

const OptionRoot = styled.div`
  ${({ theme: { palette, transitions, utils } }) => css`
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    background-color: ${utils.toRgba(palette.background.light, 0.2)};
    padding: 0.75rem 1rem;
    margin: 5px 0;
    transition: background-color ${transitions.duration.main}s;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 2px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: ${utils.lighten(palette.background.light, 3)};
      transition: all ${transitions.duration.main}s;
      opacity: 0;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
    }
  `}
`;

const OptionTextRoot = styled.div<CommonProps>`
  ${({ fullWidth }) => css`
    width: ${fullWidth ? '100%' : '60%'};
    flex-grow: 1;
    font-size: 0.85rem;
    line-height: 1.3;
  `}
`;

const OptionValueRoot = styled.div<CommonProps>`
  ${({ fullWidth }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${!fullWidth && 'flex-end'};
    width: ${fullWidth ? '100%' : '40%'};
    flex-shrink: 0;
    padding-left: ${!fullWidth && '20px'};
    margin-top: ${fullWidth && '15px'};
  `}
`;

Option.defaultProps = defaulpCommonProps;
OptionText.defaultProps = defaulpCommonProps;
OptionValue.defaultProps = defaulpCommonProps;

Option.Text = OptionText;
Option.Value = OptionValue;

export default Option;
