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
      '/home/dillon/.config/Nexus_Wallet_BETA_v0.8.4/Installed_Modules/Tester/index.js'
    ).default;
    console.log(Testimport);
    this.forceUpdate();
  }
  render() {
    return (
      <Panel icon={chartIcon} title={<Text id="Market.Information" />}>
        <button onClick={() => this.importTest()}>Import Da Module!</button>
        {Testimport && <Testimport thisthing="Look at these props!" />}
      </Panel>
    );
  }
}
