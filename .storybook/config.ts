import * as React from "react";
import { ThemeProvider } from 'react-jss';
import {addDecorator, configure} from '@storybook/react';

import { withKnobs } from "@storybook/addon-knobs/react";
import { defaultTheme } from "../src/themes/theme";

function loadStories() {
  const req = require.context("../src", true, /\.stories\.tsx$/);
  req.keys().forEach(req);
}

addDecorator(function (story) {
  return React.createElement(
    ThemeProvider,
    {theme: defaultTheme},
    story()
  );
});

addDecorator(withKnobs);

configure(loadStories, module);