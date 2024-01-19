import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export const Colors = {
  blackMamba: '#0d0d0d',
  blackCarbon: '#171718',
  darkGrey: '#1f2124',
  steelGrey: '#393d42',
  leadGrey: '#6a6e73',
  ashGrey: '#9fa3a9',
  lightBlue: '#2196f3',
  pureWhite: '#ffffff',
  slateGrey: '#999999',
  lightGrey: '#cccccc'
}

export const i18n = {
  vinylTitle: 'Vinyl Records',
  cdTitle: 'Compact Discs',
  cassetteTitle: 'Cassettes',
  digitalTitle: 'Digital (lossless)'
}

export const themeIcons = {
  vinylIcon: (size = 30, color = Colors.blackCarbon) => <MaterialCommunityIcons name="record-player" size={size} color={color} />,
  cassetteIcon: (size = 30, color = Colors.blackCarbon) => <MaterialCommunityIcons name="cassette" size={size} color={color} />,
  cdIcon: (size = 28, color = Colors.blackCarbon) => <FontAwesome5 name="compact-disc" size={size} color={color} />,
  digitalIcon: (size = 30, color = Colors.blackCarbon) => <MaterialCommunityIcons name="laptop" size={size} color={color} />
};
