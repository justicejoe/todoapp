import React, {
  useState, Fragment, useCallback, useEffect,
} from 'react'
import {
  Typography,
  Grid,
  FormControl,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  InputLabel,
  MenuItem,
  Select,
  Card,
  TextField,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import {
  ExpandMore as ExpandMoreIcon,
  AddBox as AddBoxIcon,
  DeleteForever as DeleteForeverIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@material-ui/icons'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'

import Loading from '../components/Loading'

const createListMutationGQL = gql`
mutation createList($detail: String, $status: Boolean){
  createList(record: {detail: $detail, status: $status}){
  record{
    _id
  }
  }
}`

const updateListMutationGQL = gql`
mutation updateList($id: MongoID!,$detail: String, $status: Boolean){
  updateList(record: {_id: $id, detail: $detail, status: $status}){
  record{
    _id
  }
  }
}`

const removeListMutationGQL = gql`
mutation removeList($id: MongoID!){
  removeList(_id: $id){
  record{
    _id
  }
  }
}`

const queryListGQL = gql`
query queryList($status: Boolean){
  lists(filter: {status: $status}, sort: _ID_DESC){
    _id
  detail
  status
  createdAt
  }
}`

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  layout: {
    marginLeft: spacing(2),
    marginRight: spacing(2),
    [breakpoints.up(600 + spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: spacing(3),
    marginBottom: spacing(3),
    [breakpoints.up(600 + spacing(3) * 2)]: {
      marginTop: spacing(6),
      marginBottom: spacing(6),
    },

  },
  box: {
    width: 'auto',
    marginLeft: spacing(1),
    marginRight: spacing(1),
    [breakpoints.up(900 + spacing(1) * 2)]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  auto: {
    marginBottom: spacing(1),
    [breakpoints.up(600 + spacing(1) * 2)]: {
      marginBottom: spacing(1),
    },
  },
  qrcode: {
    width: '400px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    width: spacing(3),
    height: spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: spacing(1),
    alignItems: 'center',
  },
  submit: {
    marginTop: spacing(3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: spacing(3),
    marginLeft: spacing(1),
  },
}))

const TodoList = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  const [filter, setFilter] = useState('all')
  const [text, setText] = useState('')
  const [createList] = useMutation(createListMutationGQL)
  const [updateList] = useMutation(updateListMutationGQL)
  const [removeList] = useMutation(removeListMutationGQL)
  const [queryList, list] = useLazyQuery(queryListGQL, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    queryList()
  }, [])

  const handleFilter = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        if (e.target.value === 'all') {
          queryList()
        } else {
          queryList({
            variables: {
              status: e.target.value,
            },
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    [filter],
  )

  const handleAddList = useCallback(
    async (e) => {
      e.preventDefault()
      setText('')
      try {
        await createList({
          variables: {
            detail: text,
            status: false,
          },
        })
        list.refetch()
      } catch (error) {
        throw new Error(error)
      }
    },
    [text],
  )

  const handleRemoveList = async (id) => {
    try {
      await removeList({
        variables: {
          id,
        },
      })
      list.refetch()
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleUpdateList = async (id, status) => {
    try {
      await updateList({
        variables: {
          id,
          status,
        },
      })
      list.refetch()
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>{t('todoList.title')}</Typography>
      </Grid>
      <Grid className={classes.box}>
        <form className={classes.auto} onSubmit={handleAddList}>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            />
            <ExpansionPanelDetails>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label={t('todoList.textBox')}
                  variant="outlined"
                  style={{ width: '60%' }}
                  value={text}
                  onChange={e => setText(e.target.value)}
                />

                <IconButton
                  style={{ marginTop: '30px', marginBottom: '20px', borderRadius: '20px' }}
                  onClick={handleAddList}
                  color="primary"
                  size="medium"
                >
                  <AddBoxIcon />
                </IconButton>
                <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%', maxWidth: '200px', marginRight: '10px' }}>
                  <InputLabel id="demo-simple-select-outlined-label">{t('todoList.select')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value)
                      handleFilter(e)
                    }}
                    label={t('todoList.select')}
                  >
                    <MenuItem value="all"> All</MenuItem>
                    <MenuItem value>Complete </MenuItem>
                    <MenuItem value={false}> In progress</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </form>
      </Grid>
      <Grid container justify="center" style={{ marginTop: '10px' }}>
        {list.loading ? <Loading /> : list?.data?.lists.map(listInstance => (
          <Grid item xs={12} key={listInstance._id}>
            <Card style={{
              maxWidth: '800px',
              marginBottom: '10px',
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: listInstance.status ? '#51aa4b' : null,
            }}
            >
              <Grid container alignItems="center" style={{ width: '90%' }}>
                <Grid item xs={12} sm={6}>
                  <span style={{ marginLeft: '5px', textDecoration: listInstance.status ? 'line-through' : null }}>{listInstance.detail}</span>
                </Grid>
                <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                  <IconButton
                    style={{ borderRadius: '20px' }}
                    onClick={() => handleUpdateList(listInstance._id, !listInstance.status)}
                    color="primary"
                    size="medium"
                  >
                    {listInstance.status ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </IconButton>
                  <IconButton
                    style={{ borderRadius: '20px' }}
                    onClick={() => handleRemoveList(listInstance._id)}
                    color="primary"
                    size="medium"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                  {moment(listInstance.createdAt).format('YYYY-MM-DD HH:mm')}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}
export default TodoList
