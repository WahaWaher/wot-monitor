import ReactSelect, { components } from 'react-select';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ScrollBar from '@/components/common/Scrollbar';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiClose } from '@mdi/js';

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <Icon path={mdiMenuDown} />
  </components.DropdownIndicator>
);

const ClearIndicator = (props) => (
  <components.ClearIndicator {...props}>
    <Icon path={mdiClose} />
  </components.ClearIndicator>
);

const MultiValueRemove = (props) => (
  <components.MultiValueRemove {...props}>
    <Icon path={mdiClose} />
  </components.MultiValueRemove>
);

const MenuList = ({ children }) => (
  <MenuListRoot>
    <ScrollBar autoHeight autoHeightMax={150}>
      {children}
    </ScrollBar>
  </MenuListRoot>
);

const Select = ({ components, ...rest }) => (
  <Root
    className="react-select"
    classNamePrefix="react-select"
    noOptionsMessage={() => 'Нет доступных опций...'}
    isSearchable={false}
    placeholder="Не выбрано..."
    components={{
      DropdownIndicator,
      ClearIndicator,
      MultiValueRemove,
      MenuList,
      IndicatorSeparator: () => null,
      ...components,
    }}
    {...rest}
    // menuIsOpen // for devtools
  />
);

const Root = styled(ReactSelect)`
  ${({ wide, theme: { palette, transitions, utils } }) => css`
    width: ${wide && '100%'};
    .react-select {
      &__control {
        min-height: 29px;
        border-radius: 0;
        border-color: ${palette.background.light};
        background-color: transparent;
        box-shadow: none;
        padding: 0.2em 0.1em 0.2em 0.5em;
        transition: all ${transitions.duration.main}s;
        &:hover,
        &:focus,
        &--is-focused {
          border-color: ${palette.background.light};
          background-color: ${utils.toRgba(palette.background.light, 0.25)};
        }
      }
      &__value-container {
        padding: 0;
      }
      &__placeholder {
        font-size: 0.85rem;
        color: ${palette.text.main};
        margin: 0;
      }
      &__multi-value {
        color: ${palette.text.main};
        border-radius: 0;
        background-color: transparent;
        > * {
          color: ${palette.text.main};
        }
      }
      &__multi-value__label {
        font-size: 0.8rem;
        padding: 0 3px 0 0;
      }
      &__multi-value__remove {
        cursor: pointer;
        color: ${palette.text.main};
        border-radius: 0;
        padding: 0;
        background-color: transparent !important;
        svg {
          width: 0.95em;
          height: 0.95em;
        }
        &:hover: {
          color: ${palette.danger.main};
        }
      }
      &__clear-indicator,
      &__dropdown-indicator {
        color: ${palette.text.main};
        padding: 2px;
        svg {
          width: 1.2em;
          height: 1.2em;
        }
        &:hover {
          color: ${utils.toRgba(palette.text.main, 0.75)};
        }
      }
      &__menu {
        font-size: 0.85rem;
        border-radius: 0;
        border-color: ${palette.background.light};
        box-shadow: none;
        background-color: ${utils.toRgba(palette.background.light, 0.98)};
        margin-top: 0;
      }
      &__option {
        padding: 5px 12px;
        &:hover,
        &--is-focused {
          background-color: ${utils.toRgba(palette.background.main, 0.4)};
        }
      }
      &__input {
        font-size: 0.8rem;
        line-height: 1;
      }
      &__menu-notice {
        color: ${palette.text.main};
        line-height: 1.15;
        padding: 5px 12px;
      }
    }
    [class$='Input'] {
      margin: 0 !important;
      padding: 0 !important;
    }
  `}
`;

const MenuListRoot = styled.div`
  overflow-y: auto;
  padding-bottom: 4px;
  padding-top: 4px;
  position: relative;
`;

Select.propTypes = {
  components: PropTypes.object,
  wide: PropTypes.bool,
};

Select.defaultProps = {
  components: {},
  wide: false,
};

export default Select;
