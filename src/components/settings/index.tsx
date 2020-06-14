import { Component, ComponentChild, h } from "preact";
import { connect } from "unistore/preact";
import actions, { Actions } from "../../actions";
import { GlobalState, Settings } from "../../store";
import { Notyf } from "notyf";





type SettingsKey = "mqtt_host" | "mqtt_user" | "mqtt_password";

interface SettingsPageState {
    form: Settings;
}


export class SettingsPage extends Component<Actions & GlobalState, SettingsPageState> {
    state = {
        form: {} as Settings
    }
    componentDidMount(): void {
        const { settings } = this.props;
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ form: settings });
    }

    changeHandler = (event): void => {
        const name: SettingsKey = event.target.name;
        const value: string = event.target.value;
        // debugger
        const { form } = this.state;
        this.setState({
            //@ts-ignore
            form: {
                ...form, ...{ [name]: value }
            }
        });


    }
    onSubmit = (): void => {
        const { form } = this.state;
        console.log('form', form);

        localStorage.setItem('config', JSON.stringify(form));
        new Notyf().success("Saved!");
    }
    render(): ComponentChild {
        const { form } = this.state;

        return <form onSubmit={this.onSubmit}>
            <fieldset class="form-group">
                <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Mqtt connetion</legend>
                    <div class="col-sm-10">
                        <div class="form-group col-md-6">
                            <label for="mqtt_host">Host and port</label>
                            <input value={form.mqtt_host} onChange={this.changeHandler} required type="text" class="form-control" id="mqtt_host" name="mqtt_host" placeholder="mqtt://192.168.1.200:1884" />
                            <small class="form-text text-muted">
                                This is websocket port, check for <b>Opening websockets listen socket on port</b> in moqsqitto log
</small>
                        </div>


                        <div class="form-group col-md-6">
                            <label for="mqtt_user">Username</label>
                            <input value={form.mqtt_user} onChange={this.changeHandler} type="text" class="form-control" id="mqtt_user" name="mqtt_user" placeholder="user1" />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="mqtt_password">Password</label>
                            <input value={form.mqtt_password} onChange={this.changeHandler} type="passwors" class="form-control" id="mqtt_password" name="mqtt_password" placeholder="ilovepelmeni" />
                        </div>
                    </div>
                </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Submit</button>

        </form>

    }
}

const mappedProps = ["settings"];
const ConnectedSettingsPage = connect<{}, SettingsPageState, GlobalState, Actions>(mappedProps, actions)(SettingsPage);
export default ConnectedSettingsPage;