import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export default function index() {
  return (
    <>
      <div className='bg-lightGrey min-h-screen p-5 xl:pl-40 xl:pr-40'>
        <div className='pb-5'>
          <Group position='left'>
            <Link href='/about'>
              <Button
                className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='md'
                radius='lg'
              >
                Back to About
              </Button>
            </Link>
          </Group>
        </div>
        <div className='bg-white rounded-xl p-5 pl-5 xl:pl-20 xr:pr-20 2xl:pr-40 2xl:pl-40'>
          <div className='font-varsity text-4xl text-darkBlue text-center pb-5'>User Tutorial</div>
          <div className='font-openSans text-lg text-darkBlue text-left pb-5'>
            Huddle Up operates in three key phases: pre-draft, draft, and post-draft. During the
            pre-draft phase, users can create leagues, teams, and invite friends and family to join
            their leagues and teams. This phase allows users to set up their team, and strategize
            with their chosen teammates. In the draft phase, users and their team members join a
            draft and select their initial roster of players. Finally, the post-draft phase is where
            users can trade, add or drop players from their team, and compete against other teams in
            their league.
          </div>

          <div className='font-varsity text-4xl text-darkBlue text-left pb-5'>Pre-draft</div>
          <div className='font-openSans text-md text-darkBlue text-left pb-5'>
            During the pre-draft phase, you will want to create a league and then create a team
            within this league. To create the league, navigate to the 'League' button in the
            navigation bar, and then click 'Create a League.' Here, there are a variety of options
            that you can choose for your league, such as private or public, PPR or NPPR, etc. Once
            you have finished creating your league, hit submit at the bottom, and this will take you
            to a page where you can create your team for this league. After giving your team a name
            and clicking submit, you will be brought to your pre-draft team page where you will see
            a token. You will need to give your token to your chosen teammates to join your team.
            You can then click on 'Back to League,' which will take you to the pre-draft league
            page. If you decided to make your league private, then, similar to the team token, you
            will need to give your league token to people for others to join your league. Otherwise,
            people can search for your league's name on the 'Join a League' page, which can be found
            on the Leagues page (click 'League' in the nav bar). They will then follow the same
            process as you of making a team for this league and inviting their friends.
          </div>
          <div className='font-varsity text-4xl text-darkBlue text-left pb-5'>Draft</div>
          <div className='font-openSans text-md text-darkBlue text-left pb-5'>
            After your league has enough teams and users, and your draft date has arrived, you will
            be prompted on your pre-draft league page to join the draft. You will be taken to the
            draft page where you will see your roster on the left, the players you can pick in the
            middle, and a draft history on the right. Additionally, you will see what we call the
            'Draft Belt' at the top. This shows you who is currently picking as well as who will be
            picking next. People who have not joined the draft by the start time will be set to
            'Auto-Pick,' and we will choose the best player available for them until they join.
            People who have joined the draft will not be on 'Auto-Pick' and will have 30 seconds to
            make their pick. The draft will continue until all teams have picked 15 players. Once
            the draft is completed, you will be brought back to the 'Leagues' page where you can
            click on your league and view the post-draft league page.
          </div>
          <div className='font-varsity text-4xl text-darkBlue text-left pb-5'>Post-Draft</div>
          <div className='font-openSans text-md text-darkBlue text-left pb-5'>
            Once the draft is completed and all teams have 15 players, you will officially enter the
            post-draft phase. This is the main phase of Huddle Up and where all the excitement
            begins! Every week, you will face a new opponent in the league, and within each week,
            you can add, drop, or trade players on your team. During this phase, you will also have
            access to many pages such as Matchups, Standings, Team, and Players. All of these pages
            are meant to aid you in making decisions to improve your team. We wish you luck in your
            fantasy football endeavors and hope you come out victorious!
          </div>
        </div>
      </div>
    </>
  );
}
