import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from './assets/theme';
import AlbumsList from './components/AlbumsList';

const Main = ({ route }) => {

  const { qFormat, qStatus } = route.params;

  const musicDB = [
    {
      artist: 'Queen',
      album: 'A Night at the Opera',
      year: '1976',
      cover: 'https://m.media-amazon.com/images/I/71nxRqKGA8L._UF894,1000_QL80_.jpg',
      formats: {
        vinyl: 'owned',
        cd: 'owned',
        digital: 'none',
      }
    },
    {
      artist: 'Queen',
      album: 'Queen',
      year: '1973',
      cover: 'https://upload.wikimedia.org/wikipedia/en/0/03/Queen_Queen.png',
      formats: {
        vinyl: 'owned',
        cd: 'wishlist',
        digital: 'owned',
      }
    },
    {
      artist: 'A-ha',
      album: 'Hunting High and Low',
      year: '1985',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0CChHXzPUAS2NM6HVftxfG9D1KYF9OPTtqRZMneNfFg&s',
      formats: {
        vinyl: 'owned',
        cd: 'owned',
        digital: 'owned',
      }
    },
    {
      artist: 'Guns n` Roses',
      album: 'Use Your Illution I',
      year: '1991',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hTU0jAjxqs_p2qRkEOEeueesr2UWDv6Gff_UgAUHJjj0JNce-LR8X_hzePe05jnY1H0&usqp=CAU',
      formats: {
        vinyl: 'owned',
        cd: 'wishlist'
      }
    },
    {
      artist: 'INXS',
      album: 'Platinum: Greatest Hits',
      year: '2023',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3WNS1Ok3vu_QBXTBdYkdeTCluU_fQoMvqvcAeMvSDw&s',
      formats: {
        vinyl: 'owned',
        cd: 'owned'
      }
    },
    {
      artist: 'Pink Floyd',
      album: 'Animals',
      year: '1977',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmw1YFFHXlXCf3cnavNrDOAFjCIiAJhrc22zWhcrsB7g&s',
      formats: {
        vinyl: 'wishlist',
        cd: 'owned'
      }
    },
    {
      artist: 'Poison',
      album: 'Flesh & Blood',
      year: '1990',
      cover: 'https://i.ytimg.com/vi/qsqy-JITfio/maxresdefault.jpg',
      formats: {
        vinyl: 'wishlist',
        cd: 'owned',
        digital: 'wishlist'
      }
    },
    {
      artist: 'Roxette',
      album: 'Look Sharp',
      year: '1988',
      cover: 'https://upload.wikimedia.org/wikipedia/en/c/c8/LookSharp.jpg',
      formats: {
        vinyl: 'owned',
        cd: 'wishlist'
      }
    },
    {
      artist: 'Yes',
      album: '90125',
      year: '1976',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/90125_album_cover.svg/640px-90125_album_cover.svg.png',
      formats: {
        vinyl: 'owned'
      }
    },
    {
      artist: 'Iron Maiden',
      album: 'Powerslave',
      year: '1984',
      cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/INXS_kick.jpg/220px-INXS_kick.jpg',
      formats: {
        digital: 'owned'
      }
    }
  ];

  /*
  // Obtener vista de Vinilos (Formato: Vinyl)
  const vinylCollection = musicDB
    .filter(album => album.formats.some(format => format.type === 'vinyl' && format.status === 'owned'))
    .reduce((acc, album) => {
      if (!acc[album.artist]) {
        acc[album.artist] = [];
      }
      acc[album.artist].push(album);
      return acc;
    }, {});

  // Ordenar por fecha de lanzamiento dentro de cada grupo
  for (const artist in vinylCollection) {
    vinylCollection[artist].sort((a, b) => a.year - b.year);
  }
  */
  const getFormattedCollection = (musicDB, format, status) => {
    const filteredCollection = musicDB
      .filter(album => {
        if (format === '') {
          return (
            album.formats &&
            Object.values(album.formats).some(formatStatus => formatStatus === status)
          );
        } else {
          return album.formats && album.formats[format] === status;
        }
      })
      .reduce((acc, album) => {
        acc[album.artist] = acc[album.artist] || [];
        acc[album.artist].push(album);
        return acc;
      }, {});
  
    // Ordenar por fecha de lanzamiento dentro de cada grupo
    for (const artist in filteredCollection) {
      filteredCollection[artist].sort((a, b) => a.year - b.year);
    }
  
    return filteredCollection;
  };
  
  // general lists
  const wishlist = getFormattedCollection(musicDB, '', 'wishlist');
  const owned = getFormattedCollection(musicDB, '', 'owned');

  // collection by format
  const vinylCollection = getFormattedCollection(musicDB, 'vinyl', 'owned');
  const cdCollection = getFormattedCollection(musicDB, 'cd', 'owned');
  const digitalCollection = getFormattedCollection(musicDB, 'digital', 'owned');
  

  // wishlists by format
  const vinylWishlist = getFormattedCollection(musicDB, 'vinyl', 'wishlist');
  const cdWishlist = getFormattedCollection(musicDB, 'cd', 'wishlist');
  const digitalWishlist = getFormattedCollection(musicDB, 'digital', 'wishlist');
  
  return (
    <View style={styles.appMain}>
      <AlbumsList
        albums={getFormattedCollection(musicDB, qFormat, qStatus)}
        format={qFormat}
        status={qStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  appMain: {
    backgroundColor: Colors.blackCarbon,
    flex: 1,
    padding: 0
  },
});

export default Main;