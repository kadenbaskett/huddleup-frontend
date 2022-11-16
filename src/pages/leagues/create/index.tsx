import React, {useState} from 'react';
import {Slider, Textarea, TextInput} from '@mantine/core';
import Link from 'next/link';

interface teamSlider {
  value: number;
  label: string;
}
const numTeams: teamSlider[] = [
  {value: 2, label: '2'},
  {value: 4, label: '4'},
  {value: 6, label: '6'},
  {value: 8, label: '8'},
  {value: 10, label: '10'},
  {value: 12, label: '12'},
  {value: 14, label: '14'},
  {value: 16, label: '16'},
  {value: 18, label: '18'},
  {value: 20, label: '20'},
];

interface numPlayersSlider {
  value: number;
  label: string;
}
const numPlayers: numPlayersSlider[] = [
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'},
];

export default function index() {
  const [teams, setTeamValue] = useState(10);
  const [players, setPlayersValue] = useState(2);
  return (
    <form>
      <div className='grid grid-rows-10 bg-lightGrey p-10 min-h-screen gap-10'>
        <div>
          <label className='font-varsity text-6xl'>Create Your League</label>
        </div>
        <div>
          <label className='font-OpenSans font-bold text-2xl'>League Name:</label>
          <TextInput
            placeholder='Sample League Name'
            size='xl'
            styles={() => ({
              input: {
                fontFamily: 'Varsity Team',
                color: '#ff6b00',
                fontSize: '3rem',
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
            min={2}
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
              markLabel: {display: 'none'},
            })}
            color='orange'
          />
        </div>

        <div>
          <label className='font-OpenSans font-bold text-2xl'>
            Number of Players per Team: {players}
          </label>
          <Slider
            label={(val: number) => numPlayers.find((mark) => mark.value === val)?.label}
            labelTransition='skew-down'
            labelTransitionDuration={150}
            labelTransitionTimingFunction='ease'
            min={2}
            max={6}
            value={players}
            defaultValue={2}
            onChange={setPlayersValue}
            step={1}
            marks={numPlayers}
            color='orange'
          />
        </div>

        <div>
          <label className='font-OpenSans font-bold text-2xl'>Scoring:</label>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                type='radio'
                id='PPR'
                name='hosting'
                value='PPR'
                className='hidden peer'
                required
              />
              <label
                htmlFor='PPR'
                className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-orange peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
              >
                <div className='block'>
                  <div className='w-full text-lg font-OpenSans font-bold'>Points Per Reception</div>
                  <div className='w-full font-OpenSans'>Good for small websites</div>
                </div>
              </label>
            </div>

            <div>
              <input type='radio' id='NPPR' name='hosting' value='NPPR' className='hidden peer' />
              <label
                htmlFor='NPPR'
                className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-orange peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
              >
                <div className='block'>
                  <div className='w-full text-lg font-OpenSans font-bold'>
                    No Points Per Reception
                  </div>
                  <div className='w-full'>Good for large websites</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className='font-OpenSans font-bold text-2xl'>Management Style: </label>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <input
                type='radio'
                id='voting'
                name='hosting'
                value='voting'
                className='hidden peer'
                required
              />
              <label
                htmlFor='voting'
                className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-orange peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
              >
                <div className='block'>
                  <div className='w-full text-lg font-OpenSans font-bold'>Voting</div>
                  <div className='w-full font-OpenSans'>Good for small websites</div>
                </div>
              </label>
            </div>

            <div>
              <input
                type='radio'
                id='rotating'
                name='hosting'
                value='rotating'
                className='hidden peer'
              />
              <label
                htmlFor='rotating'
                className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-orange peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
              >
                <div className='block'>
                  <div className='w-full text-lg font-OpenSans font-bold'>Rotating</div>
                  <div className='w-full'>Good for large websites</div>
                </div>
              </label>
            </div>

            <div>
              <input type='radio' id='ffa' name='hosting' value='ffa' className='hidden peer' />
              <label
                htmlFor='ffa'
                className='inline-flex justify-between items-center p-5 w-full text-darkBlue bg-white rounded-lg border border-white cursor-pointer hover:text-orange border-orange peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-orange hover:bg-gray-100 text-darkBlue'
              >
                <div className='block'>
                  <div className='w-full text-lg font-OpenSans font-bold'>Free-For-All</div>
                  <div className='w-full'>Good for large websites</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className='font-OpenSans font-bold text-2xl'>League Description:</label>
          <Textarea placeholder='Add a league description' autosize minRows={2} size='xl' />
        </div>

        <div className='grid grid-cols-10'>
          <div className='grid col-start-4 col-span-3 grid-cols-2 gap-10'>
            <div>
              <Link href={'/leagues'}>
                <button className='py-7 px-20 hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
                  Cancel
                </button>
              </Link>
            </div>

            <div>
              <Link href={'/leagues'}>
                <button
                  value='submit'
                  className='py-7 px-20 hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                >
                  Create
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
