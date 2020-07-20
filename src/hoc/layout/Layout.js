import React,{Component} from 'react'

/* Main Layout */
import Header from '../../components/Layout/Main/Header'
import Footer from '../../components/Layout/Main/Footer'

/* Not Found Layout */
import NotFoundHeader from '../../components/Layout/NotFound/Header'
import NotFoundFooter from '../../components/Layout/NotFound/Footer'

/* Languages */
import lang_en from '../../lang/en/en.json'
import lang_am from '../../lang/am/am.json'

const layout = (ChildComponent, type = 'default') =>
    class Layout extends Component {
        render() {
            const {...rest} = this.props
            const {language} = this.props
            const lang = language ? language?.language === 'EN' ? lang_en : lang_am : lang_en
            const combineRest = {...rest, lang}

            return (
                <>
                    {/* for default pages*/}
                    {
                        (type === 'default') ?
                        <>
                            <Header {...combineRest}/>
                            <ChildComponent
                                {...combineRest}
                            />
                            <Footer lang={lang}/>
                        </> : null
                    }
                    {/* for 404 page*/}
                    {
                        (type === 'not-found') ?
                            <>
                                <NotFoundHeader/>
                                <ChildComponent
                                    {...combineRest}
                                />
                                <NotFoundFooter lang={lang}/>
                            </> : null
                    }
                </>
            )
        }
    }

export default layout