import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Typography } from '../../components/atoms/Typography';
import { text, number, select, boolean, color } from '@storybook/addon-knobs';
import { defaultTheme } from '../../themes/theme';

const CONTAINER_GROUP = 'Container';
const COMPONENT_GROUP = 'Typography';

storiesOf('Atoms', module).add('Typography', () => {
  const type = select('Type', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'], 'p', COMPONENT_GROUP);
  const componentText = text('Text', 'Test', COMPONENT_GROUP);
  const fontSize = number('Font size', 16, {}, COMPONENT_GROUP);
  const bold = boolean('Bold', false, COMPONENT_GROUP);
  const textColor = color('Color', defaultTheme.palette.blackPrimary, COMPONENT_GROUP);
  const noWrap = boolean('Disable wrapping', false, COMPONENT_GROUP);
  const width = number('Wrapper width', 300, {}, COMPONENT_GROUP);
  const margin = number('Margin', 5, {}, COMPONENT_GROUP);
  const uppercase = boolean('Uppercase', false, COMPONENT_GROUP);

  const containerColor = color(
    'Container backgorund color',
    defaultTheme.palette.grayscale[7],
    CONTAINER_GROUP,
  );

  return (
    <div style={{ width, backgroundColor: containerColor }}>
      <Typography
        type={type}
        bold={bold}
        color={textColor}
        fontSize={fontSize}
        noWrap={noWrap}
        uppercase={uppercase}
        margin={margin}
      >
        {componentText}
      </Typography>
    </div>
  );
});
