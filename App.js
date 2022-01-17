/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import customData from './data.json';

import React, {Component, Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import CheckBox from 'react-native-check-box';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Buku', 'Baru', 'Second', 'Rusak', 'N/A'],
      tableData: customData.data,
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, rowIndex, cellIndex) => (
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={() => {
          let temp = this.state.tableData;
          temp[rowIndex].map((check, index) => {
            if (index > 0) {
              temp[rowIndex][index] = false;
            }
          });
          temp[rowIndex][cellIndex] = !data;
          this.setState({
            tableData: temp,
          });
        }}
        isChecked={data}
      />
    );

    return (
      <View onScroll={this.handleScroll} style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <ScrollView>
            {state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex === 1 ||
                      cellIndex === 2 ||
                      cellIndex === 3 ||
                      cellIndex === 4
                        ? element(cellData, index, cellIndex)
                        : cellData
                    }
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </ScrollView>
        </Table>
      </View>
    );
  }
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TableView
          style={{
            justifyContent: 'center',
            marginTop: 32,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    height: 750,
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});

export default App;
