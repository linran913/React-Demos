import React, {useState, useCallback} from 'react';
import {Schedule} from '@okee-uikit/react';
import '@okee-uikit/react/themes/platform/index.css';

export default function ProFormSchedule(props) {
  const { id, value, onChange, ref } = props;
  const [datasource, setDatasource] = useState(['2019-09-01', '2019-09-03']);
  const [scheduleValue, setScheduleValue] = useState(value || []);

  const handleValueChange = useCallback(value => {
    console.log(value);
    setScheduleValue(value);
    onChange?.(value);
  }, []);
  return (
    <Schedule
      id={id}
      ref={ref}
      width={800}
      divider={2}
      value={scheduleValue}
      onValueChange={handleValueChange}
      datasource={datasource}
    />
  );
}
