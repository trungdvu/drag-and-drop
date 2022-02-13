import * as React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../common-components/Dashboard';
import { TDispatch, TRootState } from '../store';

type TDashboardPageProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const DashboardsPage: React.FC<TDashboardPageProps> = (props) => {
  React.useEffect(() => {
    props.doFetchDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('props.dashboards :>> ', props.dashboards);

  return (
    <div className="flex flex-col gap-5">
      {props.dashboards &&
        props.dashboards.map((d) => <Dashboard key={d.id} dashboard={d} />)}
    </div>
  );
};

const mapState = (state: TRootState) => ({
  dashboards: state.dashboards,
});

const mapDispatch = (dispatch: TDispatch) => ({
  doFetchDashboards: dispatch.dashboards.doFetchDashboards,
});

export default connect(mapState, mapDispatch)(DashboardsPage);
