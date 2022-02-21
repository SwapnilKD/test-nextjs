import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useMoralis, useMoralisWeb3Api, useMoralisQuery } from "react-moralis";

export default function Home() {
  const { Moralis, isInitialized, enableWeb3 } = useMoralis();
  const web3Api = useMoralisWeb3Api();
  const columns = [
    {
      width: "17%",
      title: "TIMESTAMP",
      // dataIndex: 'createdAt',
      key: "createdAt",
      render: (row) => <span>{row.createdAt.toString()}</span>,
    },
    {
      width: "17%",
      title: "BET VALUE",
      // dataIndex: 'createdAt',
      key: "betValue",
      render: (row) => <span>{row.betValue}</span>,
    },
    {
      width: "17%",
      title: "TEST VALUE",
      // dataIndex: 'createdAt',
      key: "testValue",
      render: (row) => <span>{row.testValue}</span>,
    },
  ];
  const [tableData, setTableData] = useState([]);
  const [bet, setBet] = useState(1);
  const myQuery = useMoralisQuery(
    "flipsnewnew",
    (query) => {
      return query.greaterThan("betValue", bet).descending("createdAt");
    },
    [bet],
    {
      live: true,
      onLiveEnter: (entity, all) => [...all, entity],
      onLiveCreate: (entity, all) => [...all, entity],
      onLiveDelete: (entity, all) => all.filter((e) => e.id !== entity.id),
      onLiveLeave: (entity, all) => all.filter((e) => e.id !== entity.id),
      onLiveUpdate: (entity, all) =>
        all.map((e) => (e.id === entity.id ? entity : e)),
    }
  );

  useEffect(() => {
    // Moralis.start({
    //     appId: "aGMjbkqeVaQbKvE7HwhpN8PH32LvJbhTRiw2lOpp",
    //     serverUrl: "https://mfpu7ncw1w7n.usemoralis.com:2053/server"
    // });
    // debugger;
    if (!myQuery.isFetching) {
      // debugger;
      const newTableData =
        myQuery.data &&
        myQuery.data.map((rowObject) => {
          return {
            id: rowObject.objectId,
            key: rowObject.id,
            ...rowObject.attributes,
          };
        });
      // debugger;
      console.log("liveTradeInfo newTableData=", newTableData);
      setTableData(newTableData);
    }
  }, [myQuery.data, myQuery.isFetching]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Button
          onClick={() => {
            setBet(bet + 5);
            // testNFT();
          }}
        >
          + Bet
        </Button>
      </header>
      <Table
        columns={columns}
        showHeader
        data-testid="test-table"
        scroll={true}
        bordered
        loading={myQuery.isFetching}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  );
}
