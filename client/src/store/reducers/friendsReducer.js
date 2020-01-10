import { SET_ACTIVE_RECEIVER } from '../constants';

const INITIAL_STATE = {
  friendsList: [
    {
      id: 1,
      name: 'Iron Man',
      profileImage: 'https://images5.alphacoders.com/482/thumb-350-482916.jpg',
    },
    {
      id: 2,
      name: 'Thor',
      profileImage: 'https://media.immediate.co.uk/volatile/sites/3/2017/10/oz7zbvvqwmimvlglm7ud-3742da7.jpg',
    },
    {
      id: 3,
      name: 'Hulk',
      profileImage: 'https://static.comicvine.com/uploads/original/11133/111335576/6428506-hulk-in-avengers-infinity-war-new-poster.jpg',
    },
    {
      id: 4,
      name: 'Doctor Strange',
      profileImage: 'https://itc.ua/wp-content/uploads/2016/10/Doctor_Strange_i02.jpg',
    },
    {
      id: 5,
      name: 'Captain America',
      profileImage: 'https://i.ytimg.com/vi/6XVs27ZbsA0/maxresdefault.jpg',
    }
  ],
  activeReceiver: {},
};


export default function (state = INITIAL_STATE, action={}) {
  switch(action.type) {
    case SET_ACTIVE_RECEIVER:
      return { ...state, activeReceiver: action.payload };
    default:
      return state;
  }
};