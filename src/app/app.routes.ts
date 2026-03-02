import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { authCanActivateGuard } from './core/guards/auth.guard';
import { AppShellComponent } from './core/layout/app-shell/app-shell.component';

export const routes: Routes = [
	{ path: 'login', component: LoginPageComponent },
	{ path: 'admin/login', component: LoginPageComponent, data: { authMode: 'admin' } },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{
		path: 'app',
		canActivate: [authCanActivateGuard],
		component: AppShellComponent,
		children: [
			{
				path: 'dashboard',
				loadComponent: () =>
					import('./features/dashboard/dashboard-page.component').then(
						(m) => m.DashboardPageComponent,
					),
			},
			{
				path: 'inbox',
				loadComponent: () =>
					import('./features/inbox/inbox-page.component').then((m) => m.InboxPageComponent),
			},
			{
				path: 'tasks',
				loadComponent: () =>
					import('./features/tasks/tasks-page.component').then((m) => m.TasksPageComponent),
			},
			{
				path: 'funnel',
				loadComponent: () =>
					import('./features/tasks/tasks-page.component').then((m) => m.TasksPageComponent),
			},
			{
				path: 'contacts',
				loadComponent: () =>
					import('./features/tasks/tasks-page.component').then((m) => m.TasksPageComponent),
			},
			{ path: '', redirectTo: 'inbox', pathMatch: 'full' },
		],
	},
	{ path: '', redirectTo: 'app', pathMatch: 'full' },
	{ path: '**', redirectTo: 'app' },
];
