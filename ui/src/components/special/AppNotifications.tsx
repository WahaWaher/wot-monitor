import Alert from '@/components/common/Alert';
import ButtonIconed from '@/components/common/ButtonIconed';
import ControlPanel from '@/components/common/ControlPanel';
import Message from '@/components/common/Message';
import Container from '@/components/grid/Container';
import { useDialog, useShowMore } from '@/hooks';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import {
  getNotices,
  getAllNoticesCount,
  getUnreadNoticesCount,
  getCommonSettings,
} from '@/store/selectors/profileSelectors';
import { isInMsgTypes } from '@/utils';
import { fromatDateFromTimeStamp } from '@/utils/dates';
import {
  mdiBroom,
  mdiCheckAll,
  mdiCheckCircleOutline,
  mdiCloseCircleOutline,
  mdiDeleteForever,
  mdiInformationOutline,
  mdiLightningBolt,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import Title from '@/components/common/Title';
import { MessageTypes } from '@/messages/constants';
import { MsgOutType } from '@/messages/methods/createMessage';

const filterMsgs = (
  messages: MsgOutType[] = [],
  filter: NoticeTypes[] = []
) => {
  if (!filter.length) return messages;

  return messages.filter(({ type }) => filter.includes(type));
};

const AppNotifications = () => {
  const { messages } = useSelector(getNotices);
  const { noticesTypeFilter } = useSelector(getCommonSettings);
  const allNoticesCount = useSelector(getAllNoticesCount);
  const unreadNoticesCount = useSelector(getUnreadNoticesCount);
  const dialogDelMsg = useDialog();
  const dialogDelAllMsgs = useDialog();
  const dialogMsgDetail = useDialog();
  const {
    delNoticeMsg,
    readNoticeMsg,
    delAllNoticeMsgs,
    readAllNoticeMsgs,
    toggleNoticesTypeFilter,
  } = useStoreProfileActions();
  const filteredMsgs = filterMsgs(messages, noticesTypeFilter);
  const filteredNoticesCount = filteredMsgs.length;
  const visibleMsgs = useShowMore({
    initial: 10,
    toShow: 10,
    items: filteredMsgs,
  });

  return (
    <Root>
      <ControlPanel
        className="mt-3 mb-3"
        renderInfoBar={() => (
          <div>
            <small className="mr-1">Сообщений:</small>{' '}
            <strong>{filteredNoticesCount}</strong>{' '}
            <small>из {allNoticesCount}</small>
          </div>
        )}
        renderControls={() => (
          <div className="d-flex alighn-items-center">
            <div className="mr-3">
              <ButtonIconed
                size="sm"
                type="light"
                active={isInMsgTypes(MessageTypes.success, noticesTypeFilter)}
                tooltip="Вкл./Откл. отображение успешных действий"
                renderIcon={() => <Icon path={mdiCheckCircleOutline} />}
                onClick={() => toggleNoticesTypeFilter(MessageTypes.success)}
              />
              <ButtonIconed
                size="sm"
                type="light"
                active={isInMsgTypes(MessageTypes.error, noticesTypeFilter)}
                onClick={(e) => toggleNoticesTypeFilter(MessageTypes.error)}
                tooltip="Вкл./Откл. отображение сообщений об ошибках"
                renderIcon={() => <Icon path={mdiCloseCircleOutline} />}
              />
              <ButtonIconed
                size="sm"
                type="light"
                active={isInMsgTypes(MessageTypes.reserve, noticesTypeFilter)}
                onClick={() => toggleNoticesTypeFilter(MessageTypes.reserve)}
                tooltip="Вкл./Откл. отображение сообщений о состоянии клановых резервов"
                renderIcon={() => <Icon path={mdiLightningBolt} />}
              />
            </div>
            <div>
              <ButtonIconed
                size="sm"
                type="light"
                tooltip="Пометить все, как прочитанные"
                renderIcon={() => <Icon path={mdiCheckAll} />}
                onClick={() => unreadNoticesCount && readAllNoticeMsgs()}
              />
              <ButtonIconed
                size="sm"
                type="light"
                tooltip="Удалить все сообщения"
                renderIcon={() => <Icon path={mdiBroom} />}
                onClick={() =>
                  allNoticesCount &&
                  dialogDelAllMsgs.open({
                    message: `Уверены, что хотите удалить все сообщения? Всего: ${allNoticesCount} шт.`,
                    answers: [
                      {
                        text: 'Удалить',
                        onClick: () => {
                          delAllNoticeMsgs();
                          dialogDelAllMsgs.close();
                        },
                      },
                      { text: 'Отмена', onClick: dialogDelAllMsgs.close },
                    ],
                  })
                }
              />
            </div>
            {dialogDelAllMsgs.renderDialog()}
          </div>
        )}
      />
      <Container>
        {visibleMsgs.items.map((item: { [key: string]: any }) => {
          const { type, date, id, read, message, name, error } = item;

          return (
            <Message
              className="my-2"
              type={type}
              date={fromatDateFromTimeStamp(date)}
              key={id}
              read={read}
              onMouseEnter={() => !read && readNoticeMsg(id)}
              renderControls={() => (
                <>
                  <ButtonIconed
                    size="sm"
                    type="light"
                    onClick={() =>
                      dialogMsgDetail.open({
                        type: 'empty',
                        renderMessage: () => (
                          <div>
                            <Title size="4" className="mb-3">
                              Расширенная информация о сообщении:
                            </Title>
                            <table className="mt-3 mb-2">
                              <tbody>
                                <tr>
                                  <td className="pr-3 py-1">type:</td>
                                  <td>{type}</td>
                                </tr>
                                <tr>
                                  <td className="pr-3 py-1">name:</td>
                                  <td>{name}</td>
                                </tr>
                                <tr>
                                  <td className="pr-3 py-1">message:</td>
                                  <td>{message}</td>
                                </tr>
                              </tbody>
                            </table>
                            {error && (
                              <>
                                <div className="py-2" />
                                <Title size="4" className="mb-2 bt-3">
                                  Дополнительно:
                                </Title>
                                <table>
                                  <tbody>
                                    {error.name && (
                                      <tr>
                                        <td className="pr-3 py-1">name:</td>
                                        <td>{error.name}</td>
                                      </tr>
                                    )}
                                    {error.message && (
                                      <tr>
                                        <td className="pr-3 py-1">message:</td>
                                        <td>{error.message}</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                <div className="py-2" />
                              </>
                            )}
                          </div>
                        ),
                        answers: [
                          {
                            text: 'Закрыть',
                            onClick: dialogMsgDetail.close,
                            className: 'm-0',
                          },
                        ],
                      })
                    }
                  >
                    <Icon path={mdiInformationOutline} />
                  </ButtonIconed>
                  <ButtonIconed
                    size="sm"
                    type="light"
                    onClick={() =>
                      dialogDelMsg.open({
                        message: 'Уверены, что хотите удалить сообщение?',
                        answers: [
                          {
                            text: 'Удалить',
                            onClick: () => {
                              delNoticeMsg(id);
                              dialogDelMsg.close();
                            },
                          },
                          { text: 'Отмена', onClick: dialogDelMsg.close },
                        ],
                      })
                    }
                  >
                    <Icon path={mdiDeleteForever} />
                  </ButtonIconed>
                </>
              )}
            >
              {message}
            </Message>
          );
        })}
        {visibleMsgs.hasMore() && (
          <div className="text-center mt-3 mb-2">
            <Button onClick={visibleMsgs.showMore}>Загрузить еще...</Button>
          </div>
        )}
        {!allNoticesCount && (
          <Alert shape="compact" center>
            Сообщения не найдены
          </Alert>
        )}
        {allNoticesCount > 0 && !filteredNoticesCount && (
          <Alert shape="compact" center>
            С учетом фильтра сообщений не найдено
          </Alert>
        )}
      </Container>
      {dialogDelMsg.renderDialog()}
      {dialogMsgDetail.renderDialog()}
    </Root>
  );
};

const Root = styled.div``;

export default AppNotifications;
