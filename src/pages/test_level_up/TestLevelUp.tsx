import React, { useState } from "react";
import TestLevelUpDesc from "./TestLevelUpDesc";
import TestLevelUpContent from "./TestLevelUpContent";
import TestLevelUpFinish from "./TestLevelUpFinish";
import { Col } from "react-flexbox-grid";

enum TestLevelStatus {
  Desc,
  Doing,
  Finished,
}

const TestLevelUp = () => {
  const [status, setStatus] = useState(TestLevelStatus.Desc);
  const [result, setResult] = useState<boolean[]>();

  const onStart = () => {
    setStatus(TestLevelStatus.Doing);
  };

  const onExit = () => {
    setStatus(TestLevelStatus.Desc);
  };

  const onFinish = (returnedResult: boolean[]) => {
    setStatus(TestLevelStatus.Finished);
    setResult(returnedResult);
  };

  return (
    <Col xs={12} md={8} lg={6} className="container">
      {status === TestLevelStatus.Desc && <TestLevelUpDesc onStart={onStart} />}

      {status === TestLevelStatus.Doing && (
        <TestLevelUpContent
          onExit={onExit}
          onFinish={(returnedResult) => {
            onFinish(returnedResult);
          }}
        />
      )}

      {status === TestLevelStatus.Finished && result && (
        <TestLevelUpFinish result={result} />
      )}
    </Col>
  );
};

export default TestLevelUp;
