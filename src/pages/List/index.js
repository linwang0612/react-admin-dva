import React, { useEffect, useState } from 'react'
import { Form,Card } from 'antd'
// import PageHeaderWrapper from '@/components/PageHeaderWrapper'     //引入面包屑
import { connect } from 'dva'
import StandardTable from './../StandardTable'

function List(props) {
  const {
    dispatch,
    // account: { accountList },
    loading,
  } = props

  const [formValues, setFormvalues] = useState({})
  const [selectedRows] = useState({})

  const columns = [
    {
      title: '序号',
      dataIndex: '_index',
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
    },
  ]

  function handleSearch(e) {
    e && e.preventDefault()
    const { form } = props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      dispatch({
        type: 'account/accountList',
        payload: fieldsValue,
      })
    })
  }

  function handleStandardTableChange(pagination, filtersArg, sorter) {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj }
      // newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    }
    if (sorter.field) {
      params.sort = sorter.order === 'ascend' ? 'asc' : 'desc'
    }

    dispatch({
      type: 'account/accountList',
      payload: params,
    })
  }

  useEffect(() => {
    dispatch({
      tyep: 'account/clear',
    })
    handleSearch()
  }, [])

  return (
    <div>
      <h1>Page Three</h1>
      {/*<PageHeaderWrapper>      </PageHeaderWrapper>*/}
      <Card bordered={false}>
        <div
          // className={styles.tableList}
        >
          <div
            // className={styles.tableListForm}
          >
            {/*<SearchForm formValues={formValues} handleSearch={handleSearch} {...props} />*/}
          </div>
          <StandardTable
            loading={loading}
            // data={accountList}
            columns={columns}
            rowKey="_index"
            selectedRows={selectedRows}
            hideAlert
            disablePagination={false}
            onChange={handleStandardTableChange}
          />
        </div>
      </Card>
    </div>
  )
}

const list = connect(({ accountaging, loading }) => ({
  accountaging,
  // loading: loading.models.accountaging,
}))(Form.create()(List))

export default list

