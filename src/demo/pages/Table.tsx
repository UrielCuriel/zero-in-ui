import * as React from "react";
import Table from "../../lib/src/components/Table";
import { TableSettings } from "../../lib/src/components/Table/source";

const data = [
  {
    _id: "5db087f362d89231ba0cbc27",
    isActive: true,
    name: {
      first: "Leblanc",
      last: "Mckenzie"
    },
    company: "VELOS",
    email: "leblanc.mckenzie@velos.org",
    balance: 3277.07,
    phone: "+1 (891) 552-3164",
    birthday: new Date("Sat May 08 2004 21:15:08 GMT+0000 (UTC)"),
    tags: ["excepteur", "veniam", "magna", "est", "incididunt"]
  },
  {
    _id: "5db087f3ca14fc8456bc7b99",
    isActive: false,
    name: {
      first: "Lillie",
      last: "Spears"
    },
    company: "BARKARAMA",
    email: "lillie.spears@barkarama.us",
    balance: 15863.35,
    phone: "+1 (908) 414-2981",
    birthday: new Date("Wed Nov 15 1995 09:26:48 GMT+0000 (UTC)"),
    tags: ["eu", "labore", "elit", "adipisicing", "aliquip"]
  },
  {
    _id: "5db087f304309eb2b556c20f",
    isActive: true,
    name: {
      first: "Dixie",
      last: "Macias"
    },
    company: "STROZEN",
    email: "dixie.macias@strozen.biz",
    balance: 9977.62,
    phone: "+1 (869) 427-3644",
    birthday: new Date("Tue Aug 28 1990 02:50:13 GMT+0000 (UTC)"),
    tags: ["occaecat", "ex", "magna", "nisi", "eu"]
  },
  {
    _id: "5db087f364e5317077a45c30",
    isActive: false,
    name: {
      first: "Bauer",
      last: "Hudson"
    },
    company: "CENTREE",
    email: "bauer.hudson@centree.com",
    balance: 29565.38,
    phone: "+1 (921) 534-2612",
    birthday: new Date("Mon Dec 06 1993 21:19:24 GMT+0000 (UTC)"),
    tags: ["Lorem", "magna", "et", "commodo", "veniam"]
  },
  {
    _id: "5db087f37da30fc3de63f537",
    isActive: false,
    name: {
      first: "Decker",
      last: "Guzman"
    },
    company: "VERTON",
    email: "decker.guzman@verton.tv",
    balance: 28601.53,
    phone: "+1 (824) 554-2263",
    birthday: new Date("Wed Apr 04 2012 03:39:51 GMT+0000 (UTC)"),
    tags: ["consequat", "ea", "id", "ex", "ullamco"]
  },
  {
    _id: "5db087f35b412047cab8847a",
    isActive: false,
    name: {
      first: "Douglas",
      last: "Mcpherson"
    },
    company: "PROWASTE",
    email: "douglas.mcpherson@prowaste.co.uk",
    balance: 8920.27,
    phone: "+1 (800) 419-2973",
    birthday: new Date("Sun Dec 01 1974 17:53:44 GMT+0000 (UTC)"),
    tags: ["deserunt", "anim", "cillum", "proident", "adipisicing"]
  },
  {
    _id: "5db087f3ef9f666aa43377ce",
    isActive: true,
    name: {
      first: "Claudia",
      last: "Morrison"
    },
    company: "NURPLEX",
    email: "claudia.morrison@nurplex.name",
    balance: 25742.16,
    phone: "+1 (870) 507-2575",
    birthday: new Date("Mon Jul 09 2007 18:53:59 GMT+0000 (UTC)"),
    tags: ["non", "culpa", "anim", "velit", "nulla"]
  },
  {
    _id: "5db087f301ef5e18304fbbf4",
    isActive: true,
    name: {
      first: "Carr",
      last: "Greene"
    },
    company: "NAMEGEN",
    email: "carr.greene@namegen.biz",
    balance: 14047.71,
    phone: "+1 (994) 526-2939",
    birthday: new Date("Tue Dec 26 2017 13:23:56 GMT+0000 (UTC)"),
    tags: ["magna", "ut", "aliquip", "esse", "labore"]
  },
  {
    _id: "5db087f39aceb608f5760fc2",
    isActive: false,
    name: {
      first: "Alison",
      last: "Hopper"
    },
    company: "QUILTIGEN",
    email: "alison.hopper@quiltigen.ca",
    balance: 2204.91,
    phone: "+1 (868) 409-3806",
    birthday: new Date("Sat Oct 30 1993 18:55:58 GMT+0000 (UTC)"),
    tags: ["enim", "aliquip", "nisi", "laboris", "anim"]
  },
  {
    _id: "5db087f3039e03d134b99370",
    isActive: false,
    name: {
      first: "Crane",
      last: "Frederick"
    },
    company: "LUNCHPAD",
    email: "crane.frederick@lunchpad.net",
    balance: 22569.31,
    phone: "+1 (941) 447-3830",
    birthday: new Date("Mon Dec 15 1975 00:59:21 GMT+0000 (UTC)"),
    tags: ["voluptate", "elit", "nostrud", "do", "quis"]
  }
];

export type Name = {
  first: string;
  last: string;
};

export interface User {
  _id: string;
  isActive: boolean;
  name: Name | string;
  company: string;
  email: string;
  phone: string;
  birthday: Date | string;
  balance: number | string;
  tags: string[] | string;
}

export const TablePage = () => {
  const [source, setSource] = React.useState<User[]>(data);
  const settings: TableSettings<User> = {
    actions: [
      {
        name: "add",
        type: "table",
        icon: "plus",
        action: (data: User) => {
          if (data.name) {
            const [first, last] = (data.name as string).split(" ");
            const user: User = {
              ...data,
              name: { first, last },
              birthday: new Date(data.birthday),
              balance: Number(data.balance),
              tags: (data.tags as string).split(" ")
            };
            setSource([...source, user]);
          }
        }
      },

      {
        name: "delete",
        type: "row",
        icon: "times",
        action: (data: User) => {
          let _users = source.filter(u => u._id !== data._id);
          setSource(_users);
        }
      },
      {
        name: "edit",
        type: "row",
        icon: "edit",
        action: (data: User) => {
          const user: User = {
            ...data,
            birthday: new Date(data.birthday),
            balance: Number(data.balance),
            tags: (data.tags as string).split(" ")
          };
          let _users = source.filter(u => u._id !== user._id);
          setSource([..._users, user]);
        }
      }
    ],
    key: "_id",
    columns: {
      name: {
        title: "Name",
        sort: true,
        sortObject: "name.first",
        width: "auto",
        valuePrepareFunction: (value: Name) => ` ${value.first} ${value.last}`
      },
      company: {
        title: "Company",
        width: "auto"
      },
      birthday: {
        title: "Birthday",
        format: "date",
        width: "auto"
      },
      tags: {
        title: "Tags",
        sort: false,
        width: "1fr",
        valuePrepareFunction: (value: string | string[]) =>
          typeof value !== "string"
            ? (value as string[]).reduce((a, b) => `${a} ${b}`)
            : (value as string)
      },
      balance: {
        title: "Balance",
        format: "currency",
        align: "right"
      },
      isActive: {
        title: "Active",
        type: "checkbox",
        width: "50px",
        align: "center",
        editor: {
          type: "checkbox"
        }
      }
    }
  };
  return <Table source={source} settings={settings}></Table>;
};
