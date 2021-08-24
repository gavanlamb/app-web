// ----------------------------------------------------------------------

declare module '@material-ui/system' {
  interface Shape {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
}

const shape = {
  borderRadius: 8,
  borderRadiusSm: 12,
  borderRadiusMd: 16
};

export default shape;
