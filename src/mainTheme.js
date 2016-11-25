import {
	green500, green700,
	pinkA200,
	grey100, grey300, grey400, grey500,
	white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

let spacing = {
  iconSize: 24,

  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopDrawerMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56
};

export default {
	spacing: spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: green500,
		primary2Color: green700,
		primary3Color: grey400,
		accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: grey500,
		textColor: darkBlack,
		secondaryTextColor: fade(darkBlack, 0.54),
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: green500,
		clockCircleColor: fade(darkBlack, 0.07),
		shadowColor: fullBlack,
  },
};
