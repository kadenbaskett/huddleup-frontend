import React, {useState} from 'react';
import {SegmentedControl, Slider, TextInput} from '@mantine/core';

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
    <div className='grid grid-rows-10 bg-lightGrey p-10 min-h-screen gap-.5'>
      <div>
        <label className='font-varsity text-6xl'>Create Your League</label>
      </div>
      <div>
        <TextInput
          className='font-OpenSans font-bold'
          placeholder='Sample League Name'
          label='League Name'
          size='xl'
        />
      </div>
      <div className='grid'>
        <label className='font-OpenSans font-bold text-2xl'>Number of Teams: {teams}</label>
        <Slider
          label={(val) => numTeams.find((mark) => mark.value === val)?.label}
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
          styles={{markLabel: {display: 'none'}}}
          color='orange'
        />
      </div>
      <div>
        <label className='font-OpenSans font-bold text-2xl'>
          Number of Players per Team: {players}
        </label>
        <Slider
          label={(val) => numPlayers.find((mark) => mark.value === val)?.label}
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
        <label className='font-OpenSans font-bold text-2xl'>Scoring</label>
        <div>
          <SegmentedControl
            data={[
              {value: 'code', label: 'Code'},
              {value: 'export', label: 'Export'},
            ]}
            transitionDuration={500}
            transitionTimingFunction='linear'
            size='xl'
          ></SegmentedControl>
        </div>
      </div>
    </div>
  );
}
