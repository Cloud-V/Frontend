import ImmutableModel from './immutableModel';
import {
	Map
} from 'immutable';

const User = ImmutableModel.createClass('User', {
	schema: {
		workspaceSettings: Map({
			theme: 0,
			fontSize: 15
		}),
		activated: true,
		admin: false,
		superAdmin: false,
		authType: 0,
		authComplete: true,
		type: 0,
		visible: true,
		deleted: false,
		dashboardTour: false,
		repositoryTour: false,
		workspaceTour: false,
		allowNotificationsPrompted: false,
		allowNotifications: false,
		notificationEndpoints: [],
		_id: '',
		email: '',
		username: '',
		created: new Date(),
		createdAt: new Date(),
		updatedAt: new Date(),
		__v: 0,
		token: '',
		password: '',
		confirmPassword: '',
		generatedAvatar: '',
		avatarURL: '',
		gravatarEmail: '',
		displayName: '',
		personalURL: '',
		about: '',
		timezone: 'Africa/Cairo'
	}
});

export default User;