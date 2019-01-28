import React from 'react';
import iconMap from './iconMap';
import dangerouslyInjectHTML from '../../../helpers/dangerouslyInjectHTML';
import { IconComponent } from './types';
import style from './style';

const Icon: React.FC<IconComponent.Props> = ({ icon, ...rest }) => (
  <style.Svg xmlns='http://www.w3.org/2000/svg' viewBox={iconMap[icon].viewBox} {...rest} dangerouslySetInnerHTML={dangerouslyInjectHTML(iconMap[icon].innerHTML)} />
);

export default Icon;
