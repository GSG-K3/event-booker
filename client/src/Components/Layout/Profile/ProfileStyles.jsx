export default (theme) => ({
  root: { 'text-align': 'center' },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: 48,
    fontWeight: 800,
  },
  btnCancel: {
    borderRadius: 15,
    width: 230,
    height: 33,
    background: '#FBF3F1',
    border: '1px solid #F6554D',
    fontWeight: 900,
    fontSize: 16,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#F6554D',
  },
});
