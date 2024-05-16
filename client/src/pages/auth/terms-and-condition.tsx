import {FaXmark} from "react-icons/fa6";
import {Dispatch, SetStateAction} from "react";

interface TermsAndConditionProps {
    setView: Dispatch<SetStateAction<boolean>>,
    handleAgreeAndClose: () => void
}

const TermsAndCondition = ({ setView, handleAgreeAndClose }: TermsAndConditionProps) => {
    return (
        <section className="w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-black/75">
            <div id="terms-container"
                 className="w-[40%] h-[40%] overflow-scroll p-10 flex flex-col items-center bg-white relative">
                <h1 className="text-3xl font-prompt font-[500] text-dark-blue mb-4">Terms and Conditions</h1>
                <FaXmark className="absolute top-3 right-3 cursor-pointer text-dark-blue"
                         onClick={() => setView(false)}/>
                <p className="text-sm font-prompt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                    consectetur dolor hic nam numquam possimus quaerat quam suscipit, voluptate voluptates? Accusamus
                    dolore dolorem doloremque dolores, ducimus expedita facere fuga hic incidunt maiores, nihil odio
                    pariatur porro praesentium quod repudiandae rerum saepe sint veritatis voluptatum. Accusantium ad
                    aliquid architecto deleniti doloribus, enim expedita facilis fuga hic impedit incidunt inventore
                    ipsam iure laborum minus modi nemo numquam quia, quidem ratione rem saepe soluta tempore! A ab
                    accusantium alias aliquam animi at beatae corporis cumque delectus eligendi et harum id illo in
                    itaque iure laboriosam natus odit optio placeat praesentium quasi recusandae, rerum sapiente sint
                    tempora temporibus veniam. Aliquid commodi culpa dolorem doloremque fugiat quae quia recusandae
                    soluta tenetur vitae! Alias asperiores assumenda blanditiis commodi dignissimos doloremque earum
                    eius error et eum illum, laboriosam laborum modi molestias odit, quibusdam, quis reiciendis
                    similique temporibus vitae. Autem, ducimus, eos est ex, facere iusto magnam molestiae molestias
                    repellat sit vel voluptate. Culpa cupiditate dolorem, illo molestiae nemo nisi odio quasi rem
                    suscipit! Aspernatur cum cupiditate debitis, doloremque dolores ea earum excepturi inventore iste
                    iusto, maiores minima molestias nostrum officia pariatur quae qui quidem quos, temporibus velit?
                    Commodi consectetur deleniti dignissimos, dolorem eaque est exercitationem impedit incidunt iure
                    labore libero molestiae natus nisi nobis non numquam quae quidem saepe sapiente, ut vero vitae
                    voluptatem! Ab accusamus alias corporis, doloremque eaque esse eum facilis fuga, harum impedit, ipsa
                    minima modi neque officia provident vel voluptate voluptatem! Ab adipisci autem beatae doloribus
                    eveniet expedita explicabo facilis illum, ipsa labore laboriosam optio pariatur praesentium qui
                    ratione temporibus tenetur ut vitae. Accusantium consectetur cumque deserunt dolorum exercitationem
                    facere in modi nulla odit optio, provident, quibusdam quos repudiandae sit tempore velit
                    voluptatibus? Architecto dolorum eius laborum pariatur rem saepe voluptate. Accusantium amet
                    corporis deserunt dolores excepturi facilis hic incidunt inventore magnam, natus, praesentium
                    repudiandae totam voluptatibus? Beatae corporis dolore enim ex facilis harum nesciunt nulla omnis
                    quos repellendus! Aliquam corporis deleniti distinctio dolor dolore exercitationem illo impedit,
                    inventore iusto neque omnis perspiciatis quidem repellendus repudiandae tempora, ut voluptate. Amet
                    aperiam atque blanditiis deleniti hic necessitatibus quos repellat temporibus vel velit? Aut,
                    blanditiis ducimus ea iusto nulla quibusdam quisquam recusandae. Ab accusamus accusantium alias
                    aliquid asperiores atque dicta doloremque earum eius, eligendi enim expedita facilis illum in iusto
                    labore, neque pariatur reiciendis repellendus sapiente similique soluta temporibus tenetur ut
                    voluptatibus. A ab accusamus amet corporis culpa cupiditate distinctio dolor earum error et
                    exercitationem expedita facere facilis ipsam iure magnam modi molestias mollitia neque nihil nobis
                    numquam obcaecati omnis perferendis porro quae quaerat quia ratione repudiandae sunt, suscipit
                    temporibus tenetur ut vero vitae voluptas voluptatum! A ab accusamus aliquid, amet asperiores
                    aspernatur assumenda distinctio ea eius eveniet, ex expedita fugiat id in iure labore maxime nobis
                    non nostrum placeat possimus qui quo recusandae soluta tempore vero voluptate, voluptates. Ad
                    adipisci architecto, aspernatur, atque cumque ducimus eius eligendi exercitationem facilis fugit id,
                    illo illum labore magni maxime nemo nulla perspiciatis porro quos ut. Animi asperiores consequatur
                    debitis facilis impedit iusto laboriosam molestias praesentium temporibus veniam. Asperiores ea
                    explicabo fuga molestias nisi recusandae reiciendis. Accusantium adipisci in, nihil odio omnis
                    perspiciatis quos ratione tempora. Architecto beatae doloremque, facilis impedit nesciunt odit porro
                    vitae? Consectetur cum doloremque, facere fugit harum in incidunt molestias natus nemo neque non
                    perspiciatis quia quos sed voluptate voluptates voluptatum! Ab consequuntur dicta enim, eos eum
                    facilis iure laudantium maiores quibusdam quod sit, ut vero voluptatem. A adipisci aperiam beatae
                    cumque dignissimos dolorem, dolorum ea eligendi expedita illum ipsum iste itaque laudantium libero
                    minus modi molestiae nulla officiis provident ratione repellat sequi ullam velit veritatis voluptas,
                    voluptates voluptatibus. Accusantium dignissimos, distinctio dolore eaque eligendi est eveniet ex
                    fuga harum impedit laudantium maiores molestiae necessitatibus numquam omnis, pariatur perspiciatis
                    quasi quia ratione repellat repudiandae sit soluta suscipit temporibus unde voluptas voluptate.
                    Debitis et expedita explicabo nulla obcaecati. A beatae, fugit labore laboriosam minima natus
                    numquam voluptatum! Accusamus accusantium aspernatur, assumenda at beatae corporis cupiditate dicta
                    doloremque eaque earum eligendi enim et exercitationem explicabo facilis ipsa iusto labore
                    laboriosam magni maxime, minus nihil obcaecati officia perferendis placeat provident quibusdam
                    reprehenderit rerum sequi soluta temporibus unde veritatis voluptatum. Commodi iure molestiae
                    mollitia perferendis porro repudiandae voluptas? Aliquam, beatae deserunt ducimus esse, est
                    explicabo hic id ipsam magnam minima natus pariatur quae repellat saepe sint soluta voluptas.
                    Consequatur eos est eum fuga modi quae quam quas? Architecto debitis dolores hic incidunt itaque quo
                    reprehenderit tempora? Aliquid animi consequuntur dicta doloremque eligendi eos excepturi facilis
                    fuga fugit id illo ipsam, magni minus nam neque, obcaecati placeat possimus quae qui repudiandae,
                    tempora tempore temporibus vel! At, blanditiis culpa deleniti ea et fugiat id magni molestias non
                    officia possimus praesentium reiciendis repudiandae suscipit temporibus tenetur voluptas!
                    Consequuntur dolorum est illo ipsam officia quisquam sed soluta ut. Ad aliquam assumenda atque aut
                    culpa delectus dicta distinctio dolore, earum eligendi esse eveniet exercitationem explicabo facere
                    fugiat incidunt laboriosam laborum magni maxime molestiae omnis perferendis praesentium quasi quia
                    reiciendis veniam veritatis, voluptas? Alias atque autem cum deleniti dicta, dolores eaque earum
                    eius esse excepturi harum inventore libero maxime modi neque, nihil pariatur quis recusandae
                    reprehenderit ut. Amet autem dignissimos fugiat natus perferendis vero. Animi fugit inventore quidem
                    ut veritatis? Aliquam aperiam asperiores culpa cumque delectus, ea eaque eligendi esse et ex
                    incidunt inventore molestias obcaecati officia provident quasi quidem sed sint, tempora tempore
                    totam ut velit, veritatis? Et maiores quaerat similique vero? Accusamus ad amet architecto aut
                    consequuntur dicta exercitationem facilis fugit, incidunt, inventore ipsa itaque laudantium nobis
                    possimus praesentium quibusdam quidem quis repellendus sed voluptates. Aut consectetur dolor labore
                    minus neque sint velit, voluptate! A, accusamus accusantium aliquid amet aut consectetur culpa
                    deserunt distinctio doloribus expedita facilis fuga, fugiat harum illum ipsum labore laudantium
                    maiores neque officia optio quae quaerat quia vitae. Accusantium amet architecto aspernatur aut
                    autem beatae blanditiis culpa cupiditate debitis dicta doloribus eaque ex excepturi facere fuga, hic
                    impedit inventore itaque libero magni maxime minima mollitia nesciunt nulla obcaecati officia
                    officiis omnis quia quidem quis reprehenderit sed sit veniam veritatis voluptate voluptatem
                    voluptatum. Asperiores cupiditate incidunt odio quisquam tempora.</p>
                <button
                    type="button"
                    onClick={handleAgreeAndClose}
                    className={`py-2 px-10 mt-10 bg-dark-blue text-white font-[500] tracking-wider transition-all border-2 border-dark-blue hover:bg-white hover:text-dark-blue`}>AGREE
                    AND CLOSE
                </button>
            </div>
        </section>
    )
}
export default TermsAndCondition;
