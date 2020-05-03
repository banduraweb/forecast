import React, { useEffect } from 'react';
import { getDefaultUsersWeatherByIp } from '../../store/actions';
import { PageSkeleton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const Home = () => {
    const userIpInfo = useSelector(state => state.userIpInfo);
  console.log(userIpInfo,'userIpInfo');

    const dispatch = useDispatch();
    useEffect(() => {
      if (!userIpInfo) {
        dispatch(getDefaultUsersWeatherByIp());
      }
    }, []);
    const userCurrentWeather = userIpInfo ? (

      <div className="card-container  home-detected-city">
        <div>test</div>
        <Tabs type="card" >
          <TabPane tab="Tab Title 1" key="1">
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
          </TabPane>
          <TabPane tab="Tab Title 2" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="Tab Title 3" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="Tab Title 4" key="4">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="Tab Title 5" key="5">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="Tab Title 5" key="6">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="Tab Title 5" key="7">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </div>

    ) : (
        <div>
            <PageSkeleton />
        </div>
    );

    return <div>{userCurrentWeather}</div>;
};
