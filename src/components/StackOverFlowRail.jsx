import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import DateFormat from "dateformat";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: "bold",
  },
}))(TableCell);

const StackOverFlowRail = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState();
  const [selected, setSelected] = useState();

  const handleClickOpen = (row) => {
    setOpen(true);
    setSelected(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchdata() {
      const res = await axios.get(
        "https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&order=desc&sort=activity&site=stackoverflow"
      );
      const array = [];
      res.data.items &&
        res.data.items.length > 0 &&
        res.data.items.map((val) => {
          let data = {
            Author: val.owner.display_name,
            Title: val.title,
            creationDate: val.creation_date,
            ansLink: val.link,
          };
          return array.push(data);
        });
      setRows(array);
    }
    fetchdata();
  }, []);

  return (
    <div>
      <h1>StackOverFlow Rail</h1>
      <Paper
        variant="outlined"
        elevation={10}
        style={{
          margin: "10px 15px 10px 15px",
          border: "2px solid black",
          borderRadius: "10px",
        }}
      >
        {rows ? (
          <div>
            <Table
              className={classes.table}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead
                style={{
                  borderBottom: "2px solid black",
                }}
              >
                <TableRow>
                  <StyledTableCell
                    style={{
                      width: "20%",
                    }}
                  >
                    Author{" "}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{
                      width: "60%",
                    }}
                  >
                    Title{" "}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{
                      width: "20%",
                    }}
                  >
                    Creation Date{" "}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
            </Table>
            <div style={{ overflow: "auto", height: "500px" }}>
              <Table style={{ tableLayout: "fixed" }}>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow
                      key={i}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickOpen(row)}
                    >
                      <TableCell
                        style={{
                          width: "20%",
                        }}
                      >
                        {row.Author}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "60%",
                        }}
                        align="center"
                      >
                        {row.Title}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "20%",
                        }}
                      >
                        {DateFormat(
                          row.creationDate * 1000,
                          "ddd,dS mmm , yyyy, h:MM:ss TT"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          ""
        )}
      </Paper>

      {selected && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Title</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {selected.Title} <br />
              <a href={selected.ansLink} target="_blank" rel="noreferrer">
                Open in new tab
              </a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default StackOverFlowRail;
