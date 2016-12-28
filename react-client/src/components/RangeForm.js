import React, { Component, PropTypes } from 'react'

class RangeForm extends Component {
    static propTypes = {
        urlPrefix: PropTypes.string.isRequired,
        keyPrefix: PropTypes.string.isRequired
    }

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        // TODO move years and months values to Redux so they can be used globally
        this.state = {
            years: ['2016', '2017'],
            months: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
        }
    }

    // NOTE ultimately this submission callback may need to come through propTypes
    handleSubmit (event) {
        event.preventDefault()
        const redirect = `${this.props.urlPrefix}/from/${this.rangeStartYear.value}/${this.rangeStartMonth.value}/to/${this.rangeEndYear.value}/${this.rangeEndMonth.value}/`
        console.log(redirect)
    }

    getMonths (prefix) {
        return this.state.months.map((month, i) => (
            <option value={i} key={prefix + month}>{month}</option>
        ))
    }

    getYears (prefix) {
        return this.state.years.map(year => (
            <option value={year} key={prefix + year}>{year}</option>
        ))
    }

    render () {
        return (
            <form className="range-selector-form" onSubmit={this.handleSubmit}>
                <fieldset>
                    <select name="range-start-month" ref={(input) => this.rangeStartMonth = input}>
                        {this.getMonths(`${this.props.keyPrefix}-start`)}
                    </select>
                    <select name="range-start-year" ref={(input) => this.rangeStartYear = input}>
                        {this.getYears(`${this.props.keyPrefix}-start`)}
                    </select>
                </fieldset>
                -
                <fieldset>
                    <select name="range-end" ref={(input) => this.rangeEndMonth = input}>
                        {this.getMonths(`${this.props.keyPrefix}-range-end`)}
                    </select>
                    <select name="range-start-year" ref={(input) => this.rangeEndYear = input}>
                        {this.getYears(`${this.props.keyPrefix}-end`)}
                    </select>
                </fieldset>
                <button type="submit" name="submit">Submit</button>
            </form>
        )
    }
}

export default RangeForm
