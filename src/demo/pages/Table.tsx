import * as React from "react";
import Table from "../../lib/src/components/Table";
import { TableSettings } from "../../lib/src/components/Table/source";
import Checkbox from "../../lib/src/components/Forms/Checkbox";

const data = [
  {
    _id: "5daf967b85069b669ff12d70",
    isActive: false,
    name: {
      first: "Mary",
      last: "Mcguire"
    },
    company: "ACRUEX",
    email: "mary.mcguire@acruex.biz",
    phone: "+1 (923) 486-3678",
    tags: ["voluptate", "veniam", "exercitation", "ipsum", "duis"]
  },
  {
    _id: "5daf967b604ed9bb53264904",
    isActive: true,
    name: {
      first: "Bell",
      last: "Conrad"
    },
    company: "QUORDATE",
    email: "bell.conrad@quordate.biz",
    phone: "+1 (997) 464-3630",
    tags: ["labore", "nisi", "esse", "commodo", "duis"]
  },
  {
    _id: "5daf967b48bb3ca80bdf5363",
    isActive: false,
    name: {
      first: "Fowler",
      last: "Savage"
    },
    company: "ZINCA",
    email: "fowler.savage@zinca.ca",
    phone: "+1 (939) 592-3920",
    tags: ["consequat", "non", "non", "id", "aliquip"]
  },
  {
    _id: "5daf967b91b0fa8bd4f2f2d5",
    isActive: true,
    name: {
      first: "Andrea",
      last: "Stephens"
    },
    company: "ZOARERE",
    email: "andrea.stephens@zoarere.co.uk",
    phone: "+1 (951) 432-2893",
    tags: ["id", "officia", "sunt", "commodo", "aute"]
  },
  {
    _id: "5daf967b9d9cdb08032fec2c",
    isActive: true,
    name: {
      first: "Freeman",
      last: "Mckay"
    },
    company: "GLOBOIL",
    email: "freeman.mckay@globoil.io",
    phone: "+1 (966) 499-3737",
    tags: ["velit", "ipsum", "sit", "cillum", "voluptate"]
  },
  {
    _id: "5daf967b739d24962af7bad4",
    isActive: false,
    name: {
      first: "Pruitt",
      last: "Kirkland"
    },
    company: "KOOGLE",
    email: "pruitt.kirkland@koogle.name",
    phone: "+1 (844) 543-3027",
    tags: ["aliquip", "sint", "do", "et", "ea"]
  },
  {
    _id: "5daf967bbd903b1e78573a58",
    isActive: true,
    name: {
      first: "Gay",
      last: "Howell"
    },
    company: "OLYMPIX",
    email: "gay.howell@olympix.me",
    phone: "+1 (926) 454-2017",
    tags: ["elit", "nisi", "Lorem", "dolor", "est"]
  },
  {
    _id: "5daf967b519853d7875cb48f",
    isActive: true,
    name: {
      first: "Mack",
      last: "Hinton"
    },
    company: "BOINK",
    email: "mack.hinton@boink.tv",
    phone: "+1 (855) 475-3585",
    tags: ["exercitation", "veniam", "deserunt", "laborum", "excepteur"]
  },
  {
    _id: "5daf967b1bbe4bffa34f84a4",
    isActive: true,
    name: {
      first: "Lynda",
      last: "Garza"
    },
    company: "AQUAMATE",
    email: "lynda.garza@aquamate.net",
    phone: "+1 (961) 564-2889",
    tags: ["labore", "proident", "tempor", "adipisicing", "ullamco"]
  },
  {
    _id: "5daf967b7a4ba16b35aafea5",
    isActive: false,
    name: {
      first: "Dale",
      last: "Bryan"
    },
    company: "MALATHION",
    email: "dale.bryan@malathion.info",
    phone: "+1 (801) 529-3066",
    tags: ["magna", "in", "velit", "nostrud", "magna"]
  }
];

export interface Name {
  first: string;
  last: string;
}

export interface User {
  _id: string;
  isActive: boolean;
  name: Name;
  company: string;
  email: string;
  phone: string;
  tags: string[];
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
          setSource([...source, data]);
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
        valuePrepareFunction: value => (
          <span>
            {value.first} {value.last}
          </span>
        )
      },
      company: {
        title: "Company",
        width: "auto"
      },
      tags: {
        title: "Tags",
        sort: false,

        align: "center",
        width: "1fr",
        valuePrepareFunction: (value: string[]) => {
          const tags = value.reduce((a, b) => `${a} ${b}`);
          return <span>{tags}</span>;
        }
      },
      isActive: {
        title: "Active",
        width: "50px",
        align: "center",
        valuePrepareFunction: (value: boolean) => (
          <Checkbox checked={value} locked={true}></Checkbox>
        ),
        editor: {
          type: "checkbox"
        }
      }
    }
  };
  return <Table source={source} settings={settings}></Table>;
};
