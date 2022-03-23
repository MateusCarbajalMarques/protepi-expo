import colors from './colors';
import fonts from './fonts';

const general = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  compImage: {
    marginTop: "20%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 98,
    width: 309,
    marginBottom: 15
  },

  texTitle: {
    fontSize: 16,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.secondaryBlack,
  },

  containerInput: {
    alignItems: 'center',
  },

  input: {
    fontSize: fonts.input,
    lineHeight: 20,
    width: '85%',
    paddingHorizontal: 5,
    marginBottom: '2%',
    fontFamily: 'HindMadurai-Regular',
  },

  invisible: {
    display : 'none',
  },

  defaultButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '85%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',

  },

  buttonBorder : {
    backgroundColor: colors.white,
    paddingVertical: 10,
    width: '85%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryColor,
  },

  textDefaultButtonBorder: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.title,
    color: colors.secondaryColor,
  },

  defaultButtonFixedEnd: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: "5%",
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
  },
  textDefaultButton: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.title,
    color: colors.white,
  },
  modelTitle: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 20,
  },
  iconModelTitle: {
    width: 25,
    height: 25,
    marginRight: 10,
    // borderWidth: 2,
    // borderColor: 'green'
  },

  tochBack : {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerModel: {
    flexDirection: 'row',
    // paddingHorizontal: 20,
    marginTop: 10,
    paddingLeft: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'green'
  },

  subHeaderModel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 2,
  },

  threePoints: {
    width: 40,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'blue',
    paddingRight: 20,
  },

  imageModelTitle: {
    maxWidth: 100,
    maxHeight: 36,
  },


  productName: {
    color: colors.secondaryColor,
    fontSize: 16,
    fontFamily: "HindMadurai-Regular",
    width:"100%",
    flexShrink:1,
  },
  productPrice: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.atention,
    width: '100%',
    flexShrink: 1,
  },
  productAmount : {
    fontSize: fonts.input,
    fontFamily: 'HindMadurai-Regular',
    color: colors.secondaryColor
  },
  produt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#899DAC',
    paddingBottom: '5%',
    marginBottom: '10%',
    width: '90%',
    alignSelf: 'center',
  },
  productImage: {
    width: 89,
    height: 89,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.25)',
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: '5%',
    flexShrink: 1,
  },
  details: {
    fontFamily: "HindMadurai-SemiBold",
    color: colors.secondaryColor,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  subProductInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },

  modalLoad: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,.8)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textModalLoad: {
    fontFamily: 'HindMadurai-Regular',
    fontSize: 20,
    marginTop: 25
  },

  action: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: 18,
    // textDecorationLine:'underline'
  },
  remove: {
    color: 'red'
  },
  change: {
    color: colors.primaryColor,
  },

  viewFixed : {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },

  datesBuy : {
    backgroundColor: colors.primaryColorDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
};

export default general;
