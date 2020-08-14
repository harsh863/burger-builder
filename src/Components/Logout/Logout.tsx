import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {AUTH_TOKEN} from "../../Constant/constant";
import * as actions from '../../Store/Actions/combined-action';
import {connect} from "react-redux";
import {NotificationService} from "../../Services/notification.service";
import {RoutePaths} from "../../Enum/route-paths.enum";

class Logout extends Component<LogoutProps> {
    componentDidMount() {
        const notificationService = NotificationService.getInstance();
        this.props.clearOrdersStore();
        this.props.logout();
        notificationService.showNotification('Logged Out', "success");
        this.props.history.push(RoutePaths.AUTH);
        localStorage.removeItem(AUTH_TOKEN);
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    clearOrdersStore: () => dispatch(actions.clearOrdersStore()),
    logout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(withRouter(Logout));

interface LogoutProps extends RouteComponentProps{
    clearOrdersStore: () => void;
    logout: () => void;
}
