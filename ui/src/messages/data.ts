export const msgNames = {
  // base error messages
  INTERNET_DISCONNECTED_ERR: 'Нет подключения к Интернету',
  HTTP_CLIENT_ERR: 'Cетевая ошибка или ошибка в конфигурации HTTP-клиента',
  SERVER_ERR: 'Ошибка на стороне сервера',
  WOT_API_ERR: 'Ошибка при взаимодействии с WOT API',
  IPC_ERR: 'Ошибка при взаимодействии с главным процессом',
  BASE_ERR: 'Ошибка',
  UNKNOWN_ERR: 'Неизвестная ошибка',

  // ipc messages
  IPC_FETCH_CUR_PROFILE_ERR:
    'Ошибка при попытке получить данные текущего профиля',
  IPC_POST_CUR_PROFILE_ERR:
    'Ошибка при попытке записать данные текущего профиля',
  IPC_SAVE_PROFILE_ERR: 'Ошибка при попытке сохранить настройки профиля',
  IPC_SAVE_PROFILE_INFO_ERR:
    'Ошибка при попытке сохранить информацию о профиле',
  IPC_OPEN_AUTH_WIN_ERR: 'Ошибка при попытке открыть окно авторизации',
  IPC_AUTH_CANCELED_BY_USER: 'Авторизация отклонена действием пользователя',
  IPC_SEND_OS_MSG_ERR:
    'Ошибка при попытке отправить сообщение в Центр Уведомлений',
  IPC_SET_SYSTEM_STARTUP_ERR:
    'Ошибка при попытке установить приложение в автозапуск',
  IPC_UNSET_SYSTEM_STARTUP_ERR:
    'Ошибка при попытке убрать приложение из автозапуска',
  IPC_SET_TRAY_ICON_ERR:
    'Ошибка при попытке изменить изображение значка в трее',
  IPC_SET_TRAY_TOOLTIP_ERR:
    'Ошибка при попытке установить всплывающую подсказку для значка в трее',
  IPC_CHECK_FOR_UPDATES_ERR: 'Ошибка при попытке проверить наличие обновлений',
  IPC_DOWNLOAD_UPDATE_ERR: 'Ошибка при попытке загрузить обновления',
  IPC_INSTALL_UPDATE_ERR: 'Ошибка при попытке установить обновления',

  // app mesages
  APP_SAVE_PROFILE_OK: 'Данные профиля сохранены',
  APP_SAVE_PROFILE_INFO_OK: 'Информация о профиле успешно сохранена',

  // wot api messages
  WOT_AUTH_OK: 'Выполнена привязка аккаунта World of Tanks',
  WOT_LOGOUT_OK: 'Выполнена отвязка аккаунта World of Tanks',
  WOT_UNSET_AUTH_OK: 'Данные об авторизации очищены',

  // clan reserves wiget messages
  WGT_CR_START_OK: 'Виджет «Клановые резервы» запущен',
  WGT_CR_STOP_OK: 'Виджет «Клановые резервы» остановлен',
  WGT_CR_STOP_ERR: 'Ошибка при попытке оставновить виджет «Клановые резервы»',
  WGT_CR_ACTIVE_DETECTED_RSV: 'Обнаружен активный клановый резерв',
  WGT_CR_ACTIVATED_RSV:
    'Активирован клановый резерв «‎‎%RESERV_NAME%» Активен до %ACTIVE_TILL%',
};

export const wotApiMessages: { [key: string]: string } = {
  SOURCE_NOT_AVAILABLE: 'Источник данных временно не доступен',
  ACCOUNT_NOT_IN_CLAN: 'Аккаунт не состоит в клане',
  METHOD_NOT_FOUND: 'Указан неверный метод API',
  METHOD_DISABLED: 'Указаный метод API отключён',
  APPLICATION_IS_BLOCKED: 'Приложение заблокировано администрацией',
  INVALID_APPLICATION_ID: 'Неверный идентификатор приложения',
  INVALID_ACCESS_TOKEN: 'Неверный токен доступа или срок его действия истек',
  ACCESS_TOKEN_NOT_SPECIFIED:
    'Неверный токен доступа или срок его действия истек',
  INVALID_IP_ADDRESS: 'Недопустимый IP-адрес для серверного приложения',
  REQUEST_LIMIT_EXCEEDED: 'Превышены лимиты квотирования',
  'INVALID_%FIELD%': 'Указано не валидное значение параметра %FIELD%',
  '%FIELD%_LIST_LIMIT_EXCEEDED':
    'Превышен лимит переданных идентификаторов в поле %FIELD%',
  '%FIELD%_NOT_FOUND': 'Информация не найдена',
  '%FIELD%_NOT_SPECIFIED': 'Не заполнено обязательное поле %FIELD%',
  AUTH_CANCEL: 'Пользователь отменил авторизацию для приложения',
  AUTH_EXPIRED: 'Превышено время ожидания авторизации пользователя',
  AUTH_ERROR: 'Ошибка аутентификации',
};

export const osNoticeTypeNames: { [key: string]: string } = {
  reserve: 'Активация резерева',
  stop: 'Отключение виджета',
};

export const reserveStatusNames: { [key: string]: string } = {
  active: 'Активен',
  ready_to_activate: 'Готов к активации',
  cannot_be_activated: 'Активация недоступна',
  unknown: 'Неизвестно',
};

export const trayTooltipNames: { [key: string]: string } = {
  regular: 'WOT Monitor',
  online:
    'WOT Monitor\nВиджет «Клановые резервы» включен.\nВедется мониторинг.\nНет активных клановых резервов.',
  reserve:
    'WOT Monitor\nВиджет «Клановые резервы» включен.\nВедется мониторинг.\nЕсть активные клановые резервы.',
  offline:
    'WOT Monitor\nВиджет «Клановые резервы» включен.\nНет сети.\nМониторинг будет восстановлен после наладки соединения.',
  warning:
    'WOT Monitor\nВиджет «Клановые резервы» включен.\nМониторинг приостановлен до устранения неполадок.',
  error: 'WOT Monitor\nВиджет «Клановые резервы» остановлен с ошибкой.',
};
