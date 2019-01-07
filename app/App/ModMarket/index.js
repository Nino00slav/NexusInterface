// External Dependencies
import React, { Component } from 'react';
import Panel from 'components/Panel';
import Text from 'components/Text';
import configuration from 'api/configuration';
import fs, { fstat } from 'fs';

// Images
import chartIcon from 'images/chart.sprite.svg';
let Testimport = null;
export default class ModMarket extends Component {
  importTest() {
    console.log(
      fs.existsSync(
        configuration.GetAppDataDirectory() + '/testModules/Tester.js'
      )
    );
    console.log(
      fs.readdirSync(configuration.GetAppDataDirectory() + '/testModules')
    );
    Testimport = global.require(
      configuration.GetAppDataDirectory() + '/testModules/Tester.js'
    ).default;
    console.log(Testimport);
    this.forceUpdate();
  }
  render() {
    return (
      <Panel icon={chartIcon} title={<Text id="Market.Information" />}>
        <button onClick={() => this.importTest()}>Import the Moduels</button>
        {Testimport && <Testimport />}
      </Panel>
    );
  }
}
