import React, { useRef, useState } from 'react';
import {
  Button,
  Group,
  NativeSelect,
  RangeSlider,
  Slider,
  Textarea,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { createLeague } from '@services/apiClient';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';
import { userSliceState } from '@store/slices/userSlice';
import router from 'next/router';
import { DatePicker, TimeInput } from '@mantine/dates';

interface teamSlider {
  value: number;
  label: string;
}
const numTeams: teamSlider[] = [
  { value: 8, label: '8' },
  { value: 10, label: '10' },
  { value: 12, label: '12' },
  { value: 14, label: '14' },
  { value: 16, label: '16' },
  { value: 18, label: '18' },
  { value: 20, label: '20' },
];

interface numPlayersSlider {
  value: number;
  label: string;
}
const numPlayers: numPlayersSlider[] = [
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
];

export default function index() {
  const user: userSliceState = useSelector((state: StoreState) => state.user);
  const [teams, setTeamValue] = useState(10);
  const [minPlayerRange, setMinPlayerRange] = useState(2);
  const [maxPlayerRange, setMaxPlayerRange] = useState(4);
  const [leagueName, setLeagueName] = useState<string>('');
  const [leagueDescription, setLeagueDescription] = useState<string>('');
  const [publicOrPrivate, setPublicOrPrivate] = useState('Public');
  const [draftDate, setDraftDate] = useState<Date | null>(new Date());
  const [draftTime, setDraftTime] = useState<string>('12:00 PM');

  const ref = useRef<HTMLInputElement>();

  function setRange(value: number[]) {
    setMinPlayerRange(value[0]);
    setMaxPlayerRange(value[1]);
  }

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    const scoring = document.querySelector('input[name="hosting"]:checked').getAttribute('value');
    const league = {
      commissionerId: user.userInfo.id,
      leagueName,
      numTeams: teams,
      minPlayers: minPlayerRange,
      maxPlayers: maxPlayerRange,
      leagueDescription,
      publicJoin: publicOrPrivate === 'Public',
      scoring,
      date: draftDate.toISOString().split('T')[0], // only get the date of of the string. take away the time
      draftTime,
    };
    const newLeague = await createLeague(league);
    await router.push({
      pathname: `/leagues/${Number(newLeague.data.id)}/create`,
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-lightGrey p-5'>
        <div className='grid grid-rows-10 bg-white p-10 min-h-screen gap-10 rounded-xl border border-white transition-all ease-in duration-200 hover:drop-shadow-md'>
          <div>
            <label className='font-varsity text-6xl'>Create Your League</label>
          </div>
          <div>
            <label className='font-OpenSans font-bold text-2xl'>League Name:</label>
            <TextInput
              placeholder='Sample League Name'
              size='xl'
              required
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              autoComplete='off'
              autoFocus
              styles={() => ({
                input: {
                  fontFamily: 'Varsity Team',
                  color: '#ff6b00',
                  fontSize: '3rem',
                  '&:focus-within': {
                    borderColor: '#ff6b00',
                  },
                },
              })}
            />
          </div>

          <div className='grid'>
            <label className='font-OpenSans font-bold text-2xl'>Number of Teams: {teams}</label>
            <Slider
              label={(val: number) => numTeams.find((mark) => mark.value === val)?.label}
              labelTransition='skew-down'
              labelTransitionDuration={150}
              labelTransitionTimingFunction='ease'
              min={8}
              max={20}
              value={teams}
              defaultValue={10}
              onChange={setTeamValue}
              step={2}
              marks={numTeams}
              styles={() => ({
                track: {
                  backgroundColor: '#ff6b00',
                },
              })}
              color='orange'
            />
          </div>

          <div>
            <label className='font-OpenSans font-bold text-2xl'>
              {'Number of Players per Team:'}{' '}
              {minPlayerRange === maxPlayerRange
                ? `${minPlayerRange}`
                : `${minPlayerRange} - ${maxPlayerRange}`}
            </label>
            <RangeSlider
              label={(val: number) => numPlayers.find((mark) => mark.value === val)?.label}
              labelTransition='skew-down'
              labelTransitionDuration={150}
              labelTransitionTimingFunction='ease'
              min={2}
              max={6}
              value={[minPlayerRange, maxPlayerRange]}
              onChange={setRange}
              minRange={0}
              step={1}
              marks={numPlayers}
              color='orange'
            />
          </div>

          <div>
            <label className='font-OpenSans font-bold text-2xl'>Scoring:</label>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <input type='radio' id='PPR' name='hosting' value='PPR' className='hidden peer' />
                <label
                  htmlFor='PPR'
                  className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-white peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
                >
                  <div className='block'>
                    <div className='w-full text-lg font-OpenSans font-bold'>
                      Points Per Reception
                    </div>
                    <div className='w-full font-OpenSans'>
                      Get extra points for catches by receivers
                    </div>
                  </div>
                </label>
              </div>

              <div>
                <input
                  type='radio'
                  defaultChecked
                  id='NPPR'
                  name='hosting'
                  value='NPPR'
                  className='hidden peer'
                />
                <label
                  htmlFor='NPPR'
                  className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-white peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
                >
                  <div className='block'>
                    <div className='w-full text-lg font-OpenSans font-bold'>
                      No Points Per Reception
                    </div>
                    <div className='w-full'>Don't get extra points for catches by receivers</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className='font-OpenSans font-bold text-2xl'>Public or Private:</label>
            <NativeSelect
              data={['Public', 'Private']}
              label='Allow anyone to join or only people you invite'
              value={publicOrPrivate}
              onChange={(event) => setPublicOrPrivate(event.currentTarget.value)}
            />
          </div>

          <div>
            <label className='font-OpenSans font-bold text-2xl'>Date of Draft:</label>
            <Group position='left'>
              <DatePicker className='bg-white' value={draftDate} onChange={setDraftDate} />
            </Group>
          </div>

          <div>
            <label className='font-OpenSans font-bold text-2xl'>Time of Draft:</label>
            <Group position='left'>
              <TimeInput
                required
                value={draftTime}
                onChange={(e) => setDraftTime(ref.current.value)}
                ref={ref}
                onClick={() => ref.current.showPicker()}
              />
            </Group>
          </div>

          <div>
            <label className='font-OpenSans font-bold text-2xl'>League Description:</label>
            <Textarea
              id='leagueDescription'
              placeholder='Add a league description'
              value={leagueDescription}
              onChange={(e) => setLeagueDescription(e.target.value)}
              autosize
              minRows={2}
              size='xl'
              styles={(theme) => ({
                input: {
                  '&:focus-within': {
                    borderColor: '#ff6b00',
                  },
                },
              })}
            />
          </div>

          <Group position='center'>
            <Link href='/leagues'>
              <Button
                className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='xl'
              >
                Cancel
              </Button>
            </Link>
            <Button
              className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='xl'
              formMethod='POST'
              type='submit'
            >
              Submit
            </Button>
          </Group>
        </div>
      </div>
    </form>
  );
}
