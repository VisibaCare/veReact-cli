import { RouteConfig } from '../../../routes';

export namespace InjectRoutesComponent {
  export interface Props {
    routes: RouteConfig[];
    url: string;
  }

  export interface Style { }
}
