import { Button, Grid, Group } from '@mantine/core';
import React from 'react';
import dashImg from '@public/assets/huddleup-3.png';
import architecture from '@public/assets/architecture.png';
import dumke from '@public/assets/dumke.jpeg';
import Image from 'next/image';
import { useWindowResize } from '@services/helpers';
import Link from 'next/link';

export default function index() {
  const windowSize: number[] = useWindowResize();
  const spanCol = windowSize[0] > 800 || windowSize[0] === 0 ? 6 : 12;
  return (
    <div className='bg-lightGrey min-h-screen p-5 xl:pl-40 xl:pr-40'>
      <div className='bg-white rounded-xl p-5 pl-5 pr-5 xl:pl-20 2xl:pl-40 xl:pr-20 2xl:pr-40'>
        <div className='font-varsity text-7xl text-darkBlue text-center'>About Us</div>
        <Grid>
          <Grid.Col span={spanCol}>
            <div className='grid place-items-end'>
              <div className='p-2'>
                <div className='font-varsity text-2xl text-darkBlue'>Abstract</div>
                <div className='text-sm lg:text-lg xl:text-xl font-openSans'>
                  HuddleUp is a fantasy football software application that incorporates the core
                  functionality of existing fantasy sports apps, such as drafting a team, managing
                  players, cutting/adding players, and more. However, it stands out from the
                  competition by offering a unique group-managed team feature. In HuddleUp, instead
                  of individually managing and being responsible for the success of a team, groups
                  of people (typically 2-5 individuals) can share the responsibility and investment
                  in the success of a single team. This innovative approach promotes collaboration,
                  teamwork, and camaraderie among group members while also providing a shared sense
                  of ownership and pride in the team's performance. With HuddleUp, users can create
                  or join leagues and teams, draft a team together, and work collaboratively to
                  manage the team throughout the season. Group members can discuss strategy, share
                  insights, and make joint decisions regarding player trades, lineups, and other
                  team management tasks.
                </div>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={spanCol}>
            <div className='position-absolute pl-5'>
              <Image src={dashImg} alt='huddle logo' width={500} height={500} objectFit='cover' />
            </div>
          </Grid.Col>
        </Grid>
        <div className='grid place-items-center pt-5'>
          <div>
            <div className='font-varsity text-2xl text-darkBlue'>Software Architecture</div>
            <div className='text-sm lg:text-lg xl:text-xl font-openSans'>
              HuddleUp is built on a robust and scalable architecture. For the backend, we utilize
              Node.js with Express, Prisma ORM, and a MySQL database. This powerful stack allows us
              to efficiently handle data processing and storage, ensuring smooth performance and
              reliability. On the frontend, we use React.js with Next.js and Redux to create a
              seamless and responsive user experience. The integration of these technologies allows
              for dynamic and interactive user interfaces that are highly optimized for performance.
              Additionally, our Draft software is designed with efficiency in mind, using a single
              websocket for each draft and supporting the ability to run multiple drafts
              simultaneously. This architecture enables our application to handle concurrent drafts
              efficiently, providing a seamless and enjoyable experience for our users.
            </div>
            <div className=' pb-5 pt-5 grid place-items-center'>
              <Image
                src={architecture}
                alt='architecture diagram'
                width={1200}
                height={800}
                objectFit='cover'
              />
            </div>
            <div className='font-varsity text-2xl text-darkBlue pt-5'>Deployment</div>
            <div className='text-sm lg:text-lg xl:text-xl font-openSans pb-5'>
              For deployment, we leverage the power of Amazon Web Services by hosting our
              application on an EC2 instance, with an RDS instance for the database. To handle
              incoming requests, we utilize Nginx as a reverse proxy, forwarding requests to their
              designated service, ensuring efficient routing and load balancing. For seamless
              deployment, we have implemented continuous integration, triggering an automated
              redeployment upon merging to the production branch in GitLab. This allows us to
              rapidly update our application with new features and bug fixes, ensuring a smooth and
              seamless experience for our users.
            </div>
            <div className='font-varsity text-2xl text-darkBlue pt-5'>The DUMKE</div>
            <div className='text-sm lg:text-lg xl:text-xl font-openSans pb-5'>
              To build comradery as a team and encourage productivity, we decided to keep an office
              space available for us throughout the week. To do this, Justin and Jake built a web
              bot (using the Selenium web-driver) to login to the University of Utah library room
              reservation system and reserve the same room everyday. This room became a staple in
              the HuddleUp workflow and has essentially become part of our capstone project.
            </div>
            <div className=' pb-5 pt-5 grid place-items-center'>
              <Image src={dumke} alt='the dumke' width={1200} height={800} objectFit='cover' />
            </div>
          </div>
        </div>
        <Group position='center'>
          <Link href='/about/team'>
            <Button
              className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='xl'
              radius='lg'
            >
              Meet the Team
            </Button>
          </Link>
          <Link href='/about/tutorial'>
            <Button
              className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='xl'
              radius='lg'
            >
              View the Tutorial
            </Button>
          </Link>
        </Group>
      </div>
    </div>
  );
}
