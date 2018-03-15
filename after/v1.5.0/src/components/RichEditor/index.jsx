/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：rich editor
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor, Modifier, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import './index.scss'

class RichEditor extends Component {
    constructor (props) {
        super(props)
        // const sampleMarkup = this.props.setRichHtml
        /*
        const decorator = new CompositeDecorator([
            {
                strategy: (contentBlock, callback, contentState) => {
                    contentBlock.findEntityRanges(
                        (character) => {
                            const entityKey = character.getEntity()
                            return (
                                entityKey !== null &&
                                contentState.getEntity(entityKey).getType() === 'span'
                            )
                        },
                        callback
                    )
                },
                component: Span
            }
        ])

        const blocksFromHTML = convertFromHTML(sampleMarkup)
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        )
        */
        this.state = {
            editorState: this.props.setRichHtml ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.setRichHtml))) : EditorState.createEmpty()
        }
        this.focus = () => this.refs.editor.focus()
        this.onChange = (editorState) => {
            this.setState({editorState})
        }

        this.handleKeyCommand = (command) => this._handleKeyCommand(command)
        this.onTab = (e) => this._onTab(e)
        this.toggleBlockType = (type) => this._toggleBlockType(type)
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor)
    }

    _toggleColor (toggledColor) {
        const {editorState} = this.state
        const selection = editorState.getSelection()
        const nextContentState = Object.keys(styleMap).reduce((contentState, color) => {
            return Modifier.removeInlineStyle(contentState, selection, color)
        }, editorState.getCurrentContent())
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        )
        const currentStyle = editorState.getCurrentInlineStyle()
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color)
            }, nextEditorState)
        }
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            )
        }
        this.onChange(nextEditorState)
    }

    _handleKeyCommand (command) {
        const {editorState} = this.state
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    }

    _onTab (e) {
        const maxDepth = 4
        this.onChange(
            RichUtils.onTab(
                e, this.state.editorState,
                maxDepth
            )
        )
    }

    _toggleBlockType (blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }

    _toggleInlineStyle (inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }
    onBlur = () => {
        let option = {
            inlineStyles: inlineStyles,
            blockStyleFn: (block) => {
                switch (block.getType()) {
                    case 'blockquote':
                        return {
                            attributes: { className: 'RichEditor-blockquote' }
                        }
                    default: return null
                }
            }
        }
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        let mobileHtml = stateToHTML(contentState, option)
        if (mobileHtml === `<p><br></p>`) {
            mobileHtml = ''
        }
        let raw = convertToRaw(contentState)
        if (typeof this.props.getRichHtml === 'function') {
            this.props.getRichHtml(JSON.stringify(raw), mobileHtml)
        }
    }
    render () {
        const {editorState} = this.state
        let className = 'RichEditor-editor'
        const contentState = editorState.getCurrentContent()
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder'
            }
        }
        let readOnly = this.props.readOnly ? '' : <div>
            <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>
            <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
            <ColorControls editorState={editorState} onToggle={this.toggleColor}/>
        </div>
        return <div className="RichEditor-root">
            {readOnly}
            <div className={className} onClick={this.focus}>
                <Editor
                    readOnly ={this.props.readOnly || false}
                    onBlur={this.onBlur}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    onTab={this.onTab}
                    placeholder="请输入商品介绍"
                    ref="editor"
                    spellCheck={true}
                />
            </div>
        </div>
    }
}

/*
const Span = (props) => {
    const {style} = props.contentState.getEntity(props.entityKey).getData()
    return (
        <span style={style}>
            {props.children}
        </span>
    )
}
*/
const inlineStyles = {
    BOLD: {element: 'b'},
    ITALIC: {
        style: {
            fontSize: 16,
            fontStyle: 'italic'
        }
    },
    UNDERLINE: {
        style: {
            textDecoration: 'underline'
        }
    },
    CODE: {
        style: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2
        }
    },
    red: {
        style: {color: 'rgba(255, 0, 0, 1.0)'}
    },
    orange: {
        style: {color: 'rgba(255, 127, 0, 1.0)'}
    },
    yellow: {
        style: {color: 'rgba(180, 180, 0, 1.0)'}
    },
    green: {
        style: {color: 'rgba(0, 180, 0, 1.0)'}
    },
    blue: {
        style: {color: 'rgba(0, 0, 255, 1.0)'}
    },
    indigo: {
        style: {color: 'rgba(75, 0, 130, 1.0)'}
    },
    violet: {
        style: {color: 'rgba(127, 0, 255, 1.0)'}
    }
}
// Custom overrides for "code" style.
let COLORS = [
    {label: '红色', style: 'red'},
    {label: '橙色', style: 'orange'},
    {label: '黄色', style: 'yellow'},
    {label: '绿色', style: 'green'},
    {label: '蓝色', style: 'blue'},
    {label: '靛蓝', style: 'indigo'},
    {label: '紫色', style: 'violet'}
]

class StyleColorButton extends React.Component {
    constructor (props) {
        super(props)
        this.onToggle = (e) => {
            e.preventDefault()
            this.props.onToggle(this.props.style)
        }
    }
    render () {
        let style
        let className = 'RichEditor-styleButton'
        if (this.props.active) {
            style = styleMap[this.props.style]
        }
        return (
            <span style={style} className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        )
    }
}

const ColorControls = (props) => {
    let currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div className="RichEditor-controls">
            {COLORS.map(type =>
                <StyleColorButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    },
    // h1: {
    //   fontSize: '30px'
    // },
    // h2: {
    //     fontSize: '24px'
    // },
    // h3: {
    //     fontSize: '18.72px'
    // },
    // h4: {
    //     fontSize: '16px'
    // },
    // h5: {
    //     fontSize: '13.28px'
    // },
    // h6: {
    //     fontSize: '12px'
    // },
    red: {
        color: 'rgba(255, 0, 0, 1.0)'
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)'
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)'
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)'
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)'
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)'
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)'
    }
}

function getBlockStyle (block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote'
        default:
            return null
    }
}

class StyleButton extends Component {
    constructor () {
        super()
        this.onToggle = (e) => {
            e.preventDefault()
            this.props.onToggle(this.props.style)
        }
    }

    render () {
        let style
        let className = 'RichEditor-styleButton'
        if (this.props.active) {
            className += ' RichEditor-activeButton'
        }

        return (
            <span style={style} className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        )
    }
}

const BLOCK_TYPES = [
    {label: '标题一', style: 'header-one'},
    {label: '标题二', style: 'header-two'},
    {label: '标题三', style: 'header-three'},
    {label: '标题四', style: 'header-four'},
    {label: '标题五', style: 'header-five'},
    {label: '标题六', style: 'header-six'},
    {label: '引用', style: 'blockquote'},
    {label: '有序列表', style: 'unordered-list-item'},
    {label: '无序列表', style: 'ordered-list-item'},
    {label: '代码块', style: 'code-block'}
]

const BlockStyleControls = (props) => {
    const {editorState} = props
    const selection = editorState.getSelection()
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

const INLINE_STYLES = [
    // {label: '一号字', style: 'h1'},
    // {label: '二号字', style: 'h2'},
    // {label: '三号字', style: 'h3'},
    // {label: '四号字', style: 'h4'},
    // {label: '五号字', style: 'h5'},
    // {label: '六号字', style: 'h6'},
    {label: '加粗', style: 'BOLD'},
    {label: '斜体', style: 'ITALIC'},
    {label: '下划线', style: 'UNDERLINE'},
    {label: '等宽字体', style: 'CODE'}
]

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        layoutConfig: state.layoutConfig
    }
}

export default connect(mapStateToProps)(RichEditor)
