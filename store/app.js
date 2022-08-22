export const state = () => ({
  menu: [
    { to: '/cards', title: 'Дебетовые карты', icon: ['fas', 'credit-card'], exact: false, permission: 'cards-read' },
    { to: '/users', title: 'Польщователи', icon: ['fa', 'user'], exact: false, permission: 'users-panel-read' },
    { to: '/audit', title: 'Лог', icon: ['fa', 'file-lines'], exact: false, permission: 'exchanges-read' },
  ],
  per_page_options: [
    { id: 10, title: '10 записей' },
    { id: 25, title: '25 записей' },
    { id: 75, title: '75 записей' },
    { id: 100, title: '100 записей' },
  ],
  status_colors: {
    default: '#ffffff',
    pink: '#f916d7',
    green: '#1efc3f',
    orange: '#ff6a00',
    blue: '#01037c',
    red: '#ff3a3a',
    yellow: '#ffeb3b',
    purple: '#2c013c',
    black: '#777f9e',
    brown: '#bf775c',
    turquoise: '#07f8fc',
  }
})

export const getters = {
  menu: state => state.menu,
  per_page_options: state => state.per_page_options,
  status_colors: state => state.status_colors,
}
