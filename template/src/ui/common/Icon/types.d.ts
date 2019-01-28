import { Icons } from './iconMap';
import { SVGAttributes } from 'react';

export namespace IconComponent {
  interface Props extends SVGAttributes<SVGElement> {
    icon: Icons;
  }

  interface Style {}
}
