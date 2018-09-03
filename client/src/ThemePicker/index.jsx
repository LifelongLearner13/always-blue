import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroupWrapper from '../common/RadioGroupWrapper';
import RadioBox from './RadioBox';
import materialUIColors from './materialUIColors';
import {
  getThemePrimary,
  getThemeSecondary,
  isThemeRequesting
} from '../redux/stateSelectors';
import { themeRequest } from './actions';

const styles = theme => ({
  section: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',
    margin: '0 auto'
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit * 2
  },
  center: {
    textAlign: 'center'
  },
  colorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: `${theme.spacing.unit * 2}px auto`,
    width: 200
  },
  submitWrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    '&:disabled': {
      backgroundColor: theme.palette.primary[200]
    }
  },
  buttonProgress: {
    color: theme.palette.secondary.dark,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12
  }
});

class ThemePicker extends Component {
  submitCallback = formData => {
    this.props.themeRequest({
      primary: formData.primary,
      secondary: formData.secondary
    });
  };

  render() {
    const { classes, handleSubmit, isRequesting } = this.props;
    return (
      <Grid item xs={12} component={'section'}>
        <Paper className={classes.section} elevation={1}>
          <form onSubmit={handleSubmit(this.submitCallback)}>
            <Typography
              variant={'title'}
              component={'h3'}
              className={classes.sectionTitle}
            >
              Choose Theme
            </Typography>
            <Typography
              variant={'body1'}
              component={'p'}
              className={classes.sectionTitle}
            >
              Customize the interface's colors.
            </Typography>
            <Grid container spacing={24} justify={'center'}>
              <Grid item xs={12} md={6}>
                <Typography
                  component={'h4'}
                  align={'center'}
                  variant={'subheading'}
                >
                  Primary
                </Typography>
                <Typography
                  component={'p'}
                  align={'center'}
                  variant={'caption'}
                >
                  Base color used throughout the interface
                </Typography>
                <Field
                  name={'primary'}
                  component={RadioGroupWrapper}
                  className={classes.colorWrapper}
                >
                  {Object.keys(materialUIColors).map(colorName => (
                    <RadioBox
                      key={colorName}
                      value={colorName}
                      label={colorName}
                      color={materialUIColors[colorName][500]}
                    />
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  component={'p'}
                  align={'center'}
                  variant={'subheading'}
                >
                  Secondary
                </Typography>
                <Typography
                  component={'p'}
                  align={'center'}
                  variant={'caption'}
                >
                  Accent color used to highlight elements
                </Typography>
                <Field
                  name={'secondary'}
                  component={RadioGroupWrapper}
                  className={classes.colorWrapper}
                >
                  {Object.keys(materialUIColors).map(colorName => (
                    <RadioBox
                      key={colorName}
                      value={colorName}
                      label={colorName}
                      color={materialUIColors[colorName][500]}
                    />
                  ))}
                </Field>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.submitWrapper}>
                  <Button
                    type="submit"
                    disabled={isRequesting}
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                  >
                    Set App Colors
                  </Button>
                  {isRequesting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    primary: getThemePrimary(state),
    secondary: getThemeSecondary(state)
  },
  isRequesting: isThemeRequesting(state)
});

const mapDispatchToProps = dispatch => ({
  themeRequest: response => dispatch(themeRequest(response))
});

const Form = reduxForm({
  form: 'themePicker',
  enableReinitialize: true
})(withStyles(styles)(ThemePicker));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
