import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TweetDetailsPageComponent } from './pages/tweet-details-page/tweet-details-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [PublicGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
    {path: '', component: FeedPageComponent},
    {path: ':userId', component: ProfilePageComponent},
    {path:'tweets/:tweetId', component: TweetDetailsPageComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
