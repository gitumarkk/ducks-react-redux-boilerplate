import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  XYPlot, XAxis, YAxis, HorizontalGridLines,
  LineSeries, VerticalBarSeries, makeWidthFlexible
} from 'react-vis';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import './style.scss';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const generateRandomNumber = () => [...Array(15).keys()].map((x) => ({ x, y: ((0.05 * (x^2)) + (10 * x * Math.random())) }));

const Footer = ({ RenderBottom, RenderTop, classes }) => (
  <Grid container spacing={24}>
    <Grid item xs={12} sm={6} md={4} style={{ marginTop: 13 }}>
      {
        RenderTop && (
          <Grid container spacing={24}>
            { RenderTop() }
          </Grid>
        )
      }

      <Grid container spacing={24}>
        <Card>
          <CardContent>
            <section>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                  <h4>
                    Table of summary stats
                  </h4>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <p>Total Number Loans: {0}</p>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <p>Total Volume Loans: {0}</p>
                </Grid>
              </Grid>
            </section>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    <Grid item xs={12} sm={6} md={8}>
      <Card>
        <CardContent>
          <FlexibleXYPlot
            height={600}
          >
            <HorizontalGridLines />
            <LineSeries
              data={generateRandomNumber()}
            />
            <LineSeries data={null} />
            <LineSeries
              data={generateRandomNumber()}
            />
            <XAxis />
            <YAxis />
          </FlexibleXYPlot>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

const styles = (theme) => ({
  gridTop: {
    marginBottom: 30,
  },
});


export default withStyles(styles, { withTheme: true })(Footer);
