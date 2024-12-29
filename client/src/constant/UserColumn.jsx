import { UserActionCell } from "../components/UserActionCell"
export const UserColumn = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text,data) => <UserActionCell status={text} data={data}/>,
    },
  ]