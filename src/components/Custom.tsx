import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function createData(obj : refObj) {
  return { obj };
}

interface refObj {
  ticker: string
  amount: string
  owned: boolean
  address: string
  site: string
  points: number
}

type tableProps = {
  address: string
  tknObj: refObj
}

type tokens = {
  address: string
  doy: refObj
  fish: refObj
  gin: refObj
  jolene: refObj
  sonnet: refObj
}

export default function CustomizedTables (props : tokens ) {
  const classes = useStyles();
  const doy = createData(props.doy)
  const fish = createData(props.fish)
  const gin = createData(props.gin)
  const jolene = createData(props.jolene)
  const sonnet = createData(props.sonnet)
  const tkns = [doy, fish, gin, jolene, sonnet];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{props.address}</StyledTableCell>
            <StyledTableCell align="right">Bag</StyledTableCell>
            <StyledTableCell align="right">Adventure Points</StyledTableCell>
            <StyledTableCell align="right">Sites</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
        {Object.entries(tkns).forEach((key, item) => (
            <StyledTableRow key={tkns[item].obj.ticker}>
              <StyledTableCell component="th" scope="row">
                {tkns[item].obj.ticker}
              </StyledTableCell>
              <StyledTableCell align="right">{tkns[item].obj.amount}</StyledTableCell>
              <StyledTableCell align="right">{tkns[item].obj.points}</StyledTableCell>
              <StyledTableCell align="right">{tkns[item].obj.site}</StyledTableCell>
            </StyledTableRow>
        ))} */}
        {/* </TableBody> */}
      </Table>
    </TableContainer>
  );
}