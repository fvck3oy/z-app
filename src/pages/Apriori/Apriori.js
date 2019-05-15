import React, { Component } from 'react'

import './Apriori.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class Apriori extends Component {
	timer = null
	state = {
		input: 'Apple, Beer, Cereal, Diapers, Eggs',
		data: 'Apple, Cereal, Diapers\nBeer, Cereal, Eggs\nApple, Beer, Cereal, Eggs\nBeer, Eggs',
		minSup: 50,
		minCon: 50,
		freqSet: [],
		strongSet: []
	}

	isSubset = (arr, items) => {
		let match = true
		items.forEach(item => {
			if (arr.indexOf(item) === -1) match = false
		})
		return match
	}

	getCombinations = arr => {
		let result = []
		let f = (prefix, arr) => {
			for (let i = 0; i < arr.length; i++) {
				result.push(prefix.concat(arr[i]))
				f(prefix.concat(arr[i]), arr.slice(i + 1))
			}
		}
		f([], arr)
		return result
	}

	getPermutations = arr => {
		let result = []
		arr.forEach(x => {
			arr.forEach(y => {
				let match = false
				for (let i = 0; i < x.length; i++) {
					if (y.indexOf(x.slice(i, i + 1).pop()) !== -1) match = true
				}
				if (!match) result.push({ x, y })
			})
		})
		return result
	}

	getKey = arr => {
		//เอา array ไปทำเป็น string จาห AB , BA
		return arr.sort((a, b) => (a < b ? -1 : b > a ? 1 : 0)).join('')
	}

	getVal = (arr, key) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].key == key) {
				return arr[i].val
			}
		}
		return 0
	}

	makeFreq = (comb, data, min = 50) => {
		let freq = []
		comb.forEach(item => {
			const key = this.getKey(item)
			freq.push({ key, item, val: 0 })

			data.forEach(line => {
				if (this.isSubset(line, item)) {
					let match = false
					for (let i = 0; i < freq.length; i++) {
						if (freq[i].key === key) {
							freq[i].val += (1 / data.length) * 100
							match = true
						}
					}
				}
			})
		})
		return freq.filter(item => item.val >= min)
	}

	makeStrong = (perm, freq, min = 50) => {
		let strong = []
		perm.forEach(item => {
			const { x, y } = item
			const freqA = this.getVal(freq, this.getKey(x.concat(y)))
			const freqB = this.getVal(freq, this.getKey(x))

			let val = Math.round((freqA / freqB) * 100) || 0
			console.log(x.join(''), y.join(''), ' | ', this.getKey(x.concat(y)), this.getKey(y), freqA, freqB, val)
			strong.push({ x, y, val })
		})
		console.log(strong)
		return strong.filter(item => item.val >= min)
	}

	calc = () => {
		this.setState(
			{
				freqSet: [],
				strongSet: []
			},
			() => {
				const { input, data, minSup, minCon } = this.state
				const INPUT = input.split(',').map(item => item.trim())
				const DATA = data.split('\n').map(line => line.split(',').map(item => item.trim()))

				const COMBINATION = this.getCombinations(INPUT)
				const PERMUTATION = this.getPermutations(COMBINATION)

				const freqSet = this.makeFreq(COMBINATION, DATA, minSup)
				const strongSet = this.makeStrong(PERMUTATION, freqSet, minCon)

				// console.log(COMBINATION.length, PERMUTATION.length, freqSet.length, strongSet.length)

				this.setState({
					freqSet,
					strongSet
				})
			}
		)
	}

	componentDidMount() {
		document.title = 'Apriori'
		this.calc()
	}

	handleChange = e => {
		const { id, value } = e.target

		clearTimeout(this.timer)
		this.timer = setTimeout(() => this.calc(), 300)

		this.setState({
			[id]: value
		})
	}

	render() {
		const { input, data, minSup, minCon, freqSet, strongSet } = this.state
		return (
			<div className="container">
				<div className="row">
					<h1>Apriori</h1>
					<div className="col-12">
						<div className="">
							<div className="row mt-3 mb-3">
								<div className="col-12">
									<label>Items</label>
									<input
										type="text"
										className="outline-effect"
										placeholder="Input Range"
										id="input"
										onChange={this.handleChange}
										value={input}
									/>
								</div>
							</div>
							<div className="mt-3 mb-3">
								<label>ItemSet</label>
								<br />
								<textarea className="outline-effect" id="data" onChange={this.handleChange} value={data} />
							</div>
							<div className="support-input row mt-3 mb-3">
								<div className="col-6">
									<label htmlFor="inline_field">Min Support ( % )</label>
									<input
										type="number"
										className="outline-effect"
										placeholder="please fill number (%)"
										id="minSup"
										onChange={this.handleChange}
										value={minSup}
									/>
								</div>

								<div className="col-6">
									<label htmlFor="warning_field">Con Support ( % )</label>
									<input
										type="number"
										className="outline-effect"
										placeholder="please fill number (%)"
										id="minCon"
										onChange={this.handleChange}
										value={minCon}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="mt-3 mb-3">
					<span className="btn-cal" onClick={e => this.calc()}>
						Calculate
					</span>
				</div> */}

				<div className="mt-5">
					<h3 className="">Frequent ItemSet ({freqSet.length})</h3>
					<table className="table">
						<tr>
							<th>ItemSet</th>
							<th>Support ( % ) </th>
						</tr>
						{freqSet
							.sort((a, b) => (a.item.length < b.item.length ? -1 : b.item.length > a.item.length ? 1 : 0))
							.map((data, index) => (
								<tr key={data.key}>
									<td className="td-effect">
										{index + 1}. [ {data.item.join(', ')} ]
									</td>
									<td className="td-effect">{data.val}%</td>
								</tr>
							))}
					</table>
				</div>

				<div className="mt-5">
					<h3 className="">Strong Association Rule ({strongSet.length})</h3>
					<table className="table">
						<tr>
							<th>ItemSet ( x )</th>
							<th />
							<th>ItemSet ( y )</th>
							<th>Support ( % )</th>
						</tr>
						{strongSet
							.sort((a, b) => (a.x.length < b.x.length ? -1 : b.x.length > a.x.length ? 1 : 0))
							.map((data, index) => (
								<tr key={index}>
									<td className="td-effect">
										{index + 1}. [ {data.x.join(', ')} ]
									</td>
									<td>=></td>
									<td className="td-effect">[ {data.y.join(', ')} ]</td>
									<td className="td-effect">{data.val}%</td>
								</tr>
							))}
					</table>
				</div>
				<div className="row mt-5">
					<div className="dev p-3 outline-effect col-12">
						Dev by
						<br />
						<a href="https://www.facebook.com/boy.reallife">Pumin Swangjang 5835512102 CoE</a>
						<br />
						<a href="https://www.facebook.com/sarunsonice">Sarunporn Srisaeng 5835512021 CoE</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Apriori
