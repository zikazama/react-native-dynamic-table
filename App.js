/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import customData from './data.json';

import Icon from 'react-native-vector-icons/FontAwesome';

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
  Dimensions,
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
      tableHead: ['Buku', 'Baru', 'Second', 'Bekas', 'Rusak', 'N/A'],
      dataColumn: [[false, false, false, false, false, false]],
      tableData: customData.data,
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, rowIndex, cellIndex, type) => (
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={() => {
          if (type === 1) {
            let temp = this.state.dataColumn;
            let temp2 = this.state.tableData;
            temp[rowIndex].map((check, index) => {
              if (index > 0) {
                temp[rowIndex][index] = false;
              }
            });
            temp2.map((check, index) => {
              check.map((check2, index2) => {
                if (index2 > 0) {
                  temp2[index][index2] = false;
                }
              });
            });
            temp2.map((check, index) => {
              check.map((check2, index2) => {
                if (index2 === cellIndex) {
                  temp2[index][index2] = !data;
                }
              });
            });
            temp[rowIndex][cellIndex] = !data;
            this.setState({
              dataColumn: temp,
            });
          } else {
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
          }
        }}
        isChecked={data}
      />
    );

    return (
      <View onScroll={this.handleScroll} style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom:20,
            }}>
            Foto Tampak Depan
          </Text>
          <Icon name="camera" size={90} color="#900" />
          <Icon name="plus" size={30} color="#900" />
        </View>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <ScrollView>
            <TableWrapper style={styles.rowHead}>
              {state.tableHead.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellData}
                  textStyle={styles.textHead}
                  style={cellIndex === 0 ? {flex: 2} : {flex: 1}}
                />
              ))}
            </TableWrapper>
          </ScrollView>
          <ScrollView>
            {state.dataColumn.map((rowData, index) => (
              <TableWrapper key={index} style={styles.rowHead}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex > 0
                        ? element(cellData, index, cellIndex, 1)
                        : cellData
                    }
                    textStyle={styles.text}
                    style={cellIndex === 0 ? {flex: 2} : {flex: 1}}
                  />
                ))}
              </TableWrapper>
            ))}
          </ScrollView>
          <ScrollView>
            {state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex > 0
                        ? element(cellData, index, cellIndex, 2)
                        : cellData
                    }
                    textStyle={styles.text}
                    style={cellIndex === 0 ? {flex: 2} : {flex: 1}}
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
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#808B97'},
  textHead: {textAlign: 'center'},
  text: {margin: 6, textAlign: 'center'},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  rowHead: {flexDirection: 'row', backgroundColor: '#808B97'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});

export default App;
