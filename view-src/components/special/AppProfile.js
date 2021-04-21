import Alert from '@/components/common/Alert';
import Link from '@/components/common/Link';
import Option from '@/components/common/Option';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import Title from '@/components/common/Title';
import routes from '@/router/routes';
import {
  getAuth,
  getProfileInfo,
} from '@/store/selectors/profileSelectors';
import { timeout } from '@/utils';
import { fromatDateFromTimeStamp } from '@/utils/dates';
import { formatNickName } from '@/utils/formatters';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@/components/common/form/TextField';
import ValidationAlert from '@/components/common/form/ValidationAlert';
import { profileNameSchema } from '@/utils/validators';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';

const AppProfile = () => {
  const info = useSelector(getProfileInfo);
  const auth = useSelector(getAuth);

  return (
    <Root>
      <div className="my-4">
        <Option>
          <Option.Text>ID</Option.Text>
          <Option.Value>
            <TextBoxSmall>{info.id}</TextBoxSmall>
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>Имя профиля</Option.Text>
          <Option.Value fullWidth>
            <ProfileNameField />
          </Option.Value>
        </Option>
      </div>

      <div className="my-4">
        {auth.token ? (
          <>
            <Title size="3" slim>
              Привязанный аккаунт
            </Title>
            <div className="my-3">
              <Option>
                <Option.Text>ID аккаунта</Option.Text>
                <Option.Value>
                  <TextBoxSmall>{auth.id}</TextBoxSmall>
                </Option.Value>
              </Option>
              <Option>
                <Option.Text>Ник</Option.Text>
                <Option.Value>
                  <TextBoxSmall>{auth.nick}</TextBoxSmall>
                </Option.Value>
              </Option>
              <Option>
                <Option.Text>Привязка активна до</Option.Text>
                <Option.Value>
                  <TextBoxSmall>
                    {fromatDateFromTimeStamp(auth.expires)}
                  </TextBoxSmall>
                </Option.Value>
              </Option>
            </div>
          </>
        ) : (
          <Alert type="warning">
            На данный момент нет привязанного аккаунта World of Tanks. Вы можете
            выполнить привязку на странице{' '}
            <Link as={NavLink} to={routes.auth.path}>
              авторизации
            </Link>
          </Alert>
        )}
      </div>
    </Root>
  );
};

const ProfileNameField = () => {
  const info = useSelector(getProfileInfo);
  const { setProfileInfo } = useStoreProfileActions();
  const { values, isSubmitting, setFieldValue, submitForm, errors } = useFormik(
    {
      initialValues: { name: info.name },
      validationSchema: profileNameSchema(),
      onSubmit: async ({ name }, { setSubmitting }) => {
        if (values.name === info.name) return;

        setProfileInfo({ name });
        await timeout(500);

        setSubmitting(false);
      },
    }
  );

  return (
    <>
      <TextField
        name="name"
        value={values.name}
        isLoading={isSubmitting}
        onChange={(e) => {
          setFieldValue('name', formatNickName(e.target.value));
        }}
        onBlur={submitForm}
      />
      {errors.name && (
        <ValidationAlert type="warning">{errors.name}</ValidationAlert>
      )}
    </>
  );
};

const Root = styled.div``;

export default AppProfile;
